function Footer() {
  //text on nav bar appear out of the line

  return (
    <div className="flex w-full justify-between px-20 items-start py-10 bg-gray-300">
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
        <div>111 Queen Street</div>
        <a
          target="_blank"
          href="https://www.google.com/maps/place/111+Queen+Street,+Thames+3500/@-37.1438297,175.5403264,17z/data=!3m1!4b1!4m6!3m5!1s0x6d728138d40d9627:0x163952e9277fe7e0!8m2!3d-37.143834!4d175.5429013!16s%2Fg%2F11jj788pdk?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D"
          className="underline"
        >
          Directions
        </a>
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
