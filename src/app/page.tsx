import SearchIcon from "@/icons/search-icon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* <header className="p-6 relative z-10 backdrop-blur-md shadow-md from-black to-black/5 border-b bg-gradient-to-b border-b-white/50">
        <Link href="/" className="text-xl">
          Silver Screen
        </Link>
      </header> */}
      <main className="relative">
        <Image
          className="brightness-50 object-cover -z-10"
          src="/banner-posters.jpg"
          alt="Banner posters"
          fill
          priority
        />
        <section className="min-h-screen flex justify-center items-center">
          <div className=" p-6 border border-white/50 rounded-xl text-center backdrop-blur shadow-md from-black to-black/5 bg-gradient-to-b m-4 max-w-4xl">
            <Link href="/" className="text-2xl">
              Silver Screen
            </Link>
            <p>Watch movies at your finger tips</p>
            <form className="mt-6">
              <div className="flex gap-x-2 items-center rounded-full px-4 py-2 bg-gray-900">
                <input
                  className="w-full placeholder:text-sm bg-transparent outline-none"
                  placeholder="Search movies"
                />
                <SearchIcon className="text-white/50 " />
              </div>
            </form>
            <button className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 mt-6">
              Browse Cataloge
            </button>
            <div className="space-y-2">
              <p className="text-justify mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Tortor at risus viverra adipiscing at. Nam aliquam sem et tortor
                consequat id porta nibh. Est ante in nibh mauris cursus mattis
                molestie a. In cursus turpis massa tincidunt dui ut ornare
                lectus. Lectus magna fringilla urna porttitor. Commodo sed
                egestas egestas fringilla phasellus faucibus. Augue lacus
                viverra vitae congue eu consequat ac. Dictum sit amet justo
                donec enim diam vulputate. Accumsan lacus vel facilisis volutpat
                est velit egestas dui. Iaculis nunc sed augue lacus viverra.
                Diam quam nulla porttitor massa id neque aliquam vestibulum
                morbi. Nisl purus in mollis nunc sed id semper. Ultrices
                sagittis orci a scelerisque purus semper. Porta lorem mollis
                aliquam ut.
              </p>
              <p className="text-justify">
                Sit amet commodo nulla facilisi nullam vehicula ipsum a arcu.
                Quam quisque id diam vel quam elementum pulvinar. Eleifend quam
                adipiscing vitae proin. In mollis nunc sed id. Dolor magna eget
                est lorem ipsum dolor sit. In mollis nunc sed id semper risus in
                hendrerit. Purus sit amet luctus venenatis lectus magna
                fringilla. Eget velit aliquet sagittis id. Turpis massa
                tincidunt dui ut ornare lectus. Eget mi proin sed libero. Cras
                pulvinar mattis nunc sed blandit libero volutpat sed cras. Sit
                amet aliquam id diam. Sit amet mattis vulputate enim nulla.
                Lectus sit amet est placerat in. Diam quis enim lobortis
                scelerisque fermentum dui. Nunc scelerisque viverra mauris in
                aliquam sem fringilla ut. Netus et malesuada fames ac turpis.
              </p>
              <p className="text-justify">
                Odio pellentesque diam volutpat commodo sed egestas egestas.
                Accumsan sit amet nulla facilisi morbi tempus iaculis urna id.
                Felis donec et odio pellentesque diam volutpat commodo sed
                egestas. In eu mi bibendum neque. Tellus in hac habitasse platea
                dictumst vestibulum. Varius morbi enim nunc faucibus a
                pellentesque sit amet. Accumsan sit amet nulla facilisi morbi
                tempus. Eleifend quam adipiscing vitae proin sagittis nisl.
                Fermentum iaculis eu non diam. Eget mauris pharetra et ultrices
                neque ornare.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
