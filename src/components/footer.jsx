function Footer() {
  //text on nav bar appear out of the line

  return (
    <div className="flex w-full justify-between px-20 items-start py-10">
      <phone className="flex-col flex">
        <h1 className="pb-5 font-roboto-light text-2xl">PHONE</h1>
        <div className="flex gap-2 items-start">
          <h2>Office</h2>
          <h2>-</h2>
          <h2>07 867 9104</h2>
        </div>
        <div className="flex justify-between items-start">
          <h2>Nikky</h2>
          <h2>-</h2>
          <h2>021 905 192</h2>
        </div>
      </phone>
      <office>
        <h1 className="pb-5 font-roboto-light text-2xl">OFFICE</h1>
      </office>
      <postal>
        <h1 className="pb-5 font-roboto-light text-2xl">POSTAL</h1>
      </postal>
      <email>
        <h1 className="pb-5 font-roboto-light text-2xl">EMAIL</h1>
      </email>
    </div>
  );
}

export default Footer;
