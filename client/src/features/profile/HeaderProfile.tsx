export default function ProfileInfo() {
  return (
    <>
      <section className="pb-12 ">
        <div className="relative mb-20 h-96">
          <img
            className="object-cover w-full h-full"
            src="https://i.postimg.cc/Y23w2gc1/pexels-ricardo-esquivel-1586298.jpg"
            alt=""
          />
          <div className="absolute bottom-0 left-0 flex items-center">
            <img
              className="object-cover w-40 h-40 ml-4 -mb-16 rounded-full lg:ml-12 lg:-mb-24 lg:w-60 lg:h-60"
              src="https://i.postimg.cc/q7pv50zT/pexels-edmond-dant-s-4342352.jpg"
              alt=""
            />
            <div className="w-40 h-40 ml-2 -mb-32 lg:ml-4 lg:-mb-48 lg:w-60 lg:h-60 flex items-center">
              <a
                href="/profile"
                className="text-black font-bold text-center text-2xl lg:text-4xl "
              >
                John Doe
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
