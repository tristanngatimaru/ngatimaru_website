#!/usr/bin/env node

/**
 * Dependency Circular Analysis Script
 * Analyzes your source code for potential circular dependencies
 * that could cause "Cannot access before initialization" errors
 */

const fs = require('fs');
const path = require('path');

class DependencyAnalyzer {
  constructor(srcDir) {
    this.srcDir = srcDir;
    this.dependencies = new Map();
    this.visited = new Set();
    this.visiting = new Set();
    this.cycles = [];
  }

  // Extract imports from a file
  extractImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = [];
      
      // Match ES6 imports
      const importRegex = /import\s+(?:[\w\s{},*]*\s+from\s+)?['"]([^'"]+)['"]/g;
      let match;
      
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        
        // Resolve relative imports
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
          let resolvedPath = path.resolve(path.dirname(filePath), importPath);
          
          // Try different extensions
          const extensions = ['.js', '.jsx', '.ts', '.tsx'];
          let foundPath = null;
          
          for (const ext of extensions) {
            const testPath = resolvedPath + ext;
            if (fs.existsSync(testPath)) {
              foundPath = testPath;
              break;
            }
          }
          
          // Try index files
          if (!foundPath) {
            for (const ext of extensions) {
              const testPath = path.join(resolvedPath, 'index' + ext);
              if (fs.existsSync(testPath)) {
                foundPath = testPath;
                break;
              }
            }
          }
          
          if (foundPath) {
            imports.push(foundPath);
          }
        }
      }
      
      return imports;
    } catch (error) {
      console.warn(`Warning: Could not analyze ${filePath}: ${error.message}`);
      return [];
    }
  }

  // Get all JS/JSX files in src directory
  getAllFiles(dir) {
    const files = [];
    
    function traverse(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          traverse(fullPath);
        } else if (stat.isFile() && /\.(js|jsx|ts|tsx)$/.test(item)) {
          files.push(fullPath);
        }
      }
    }
    
    traverse(dir);
    return files;
  }

  // Build dependency graph
  buildDependencyGraph() {
    const files = this.getAllFiles(this.srcDir);
    
    console.log(`📁 Analyzing ${files.length} files...`);
    
    for (const file of files) {
      const imports = this.extractImports(file);
      this.dependencies.set(file, imports);
    }
  }

  // Detect circular dependencies using DFS
  detectCycles(file, path = []) {
    if (this.visiting.has(file)) {
      // Found a cycle
      const cycleStart = path.indexOf(file);
      const cycle = path.slice(cycleStart).concat([file]);
      this.cycles.push(cycle);
      return;
    }
    
    if (this.visited.has(file)) {
      return;
    }
    
    this.visiting.add(file);
    path.push(file);
    
    const deps = this.dependencies.get(file) || [];
    for (const dep of deps) {
      if (this.dependencies.has(dep)) {
        this.detectCycles(dep, [...path]);
      }
    }
    
    this.visiting.delete(file);
    this.visited.add(file);
  }

  // Analyze all files for cycles
  analyze() {
    this.buildDependencyGraph();
    
    console.log(`🔍 Checking for circular dependencies...`);
    
    for (const file of this.dependencies.keys()) {
      if (!this.visited.has(file)) {
        this.detectCycles(file);
      }
    }
    
    return this.cycles;
  }

  // Generate report
  generateReport() {
    const cycles = this.analyze();
    
    console.log('\n' + '='.repeat(50));
    console.log('🔄 CIRCULAR DEPENDENCY ANALYSIS REPORT');
    console.log('='.repeat(50));
    
    if (cycles.length === 0) {
      console.log('✅ No circular dependencies detected!');
    } else {
      console.log(`❌ Found ${cycles.length} circular dependencies:`);
      
      cycles.forEach((cycle, index) => {
        console.log(`\n🔴 Circular Dependency #${index + 1}:`);
        const relativeCycle = cycle.map(file => path.relative(process.cwd(), file));
        
        for (let i = 0; i < relativeCycle.length - 1; i++) {
          console.log(`   ${relativeCycle[i]}`);
          console.log(`   ↓ imports`);
        }
        console.log(`   ${relativeCycle[relativeCycle.length - 1]}`);
      });
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 SUMMARY:');
    console.log(`- Total files analyzed: ${this.dependencies.size}`);
    console.log(`- Circular dependencies found: ${cycles.length}`);
    
    if (cycles.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      console.log('1. Extract shared code into a separate utility file');
      console.log('2. Use dependency injection patterns');
      console.log('3. Consider refactoring to remove circular imports');
      console.log('4. Use dynamic imports for non-critical dependencies');
    }
    
    return cycles;
  }
}

// Run the analysis
const srcDir = path.join(process.cwd(), 'src');

if (!fs.existsSync(srcDir)) {
  console.error('❌ src directory not found. Run this script from your project root.');
  process.exit(1);
}

const analyzer = new DependencyAnalyzer(srcDir);
const cycles = analyzer.generateReport();

// Exit with error code if cycles found
if (cycles.length > 0) {
  process.exit(1);
}
