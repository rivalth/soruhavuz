import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="p-4 bg-white rounded-md shadow">
            <Link href={"/questions/add"} className="px-4 py-2 rounded-md bg-green-600 text-white font-medium">
              Soru Ekle
            </Link>
        </div>
      </div>
    </>
  );
}
