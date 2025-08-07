// api/submitForm.js
export async function submitForm(data, endpoint) {
  const res = await fetch(`http://localhost:1337/api/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    throw new Error("Submission failed");
  }

  return await res.json();
}
