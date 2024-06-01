import { getDocuments } from "@/lib/firestore/getData";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {
  const [dersData, setDersData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      let data = await getDocuments("ders");
      if (data.result) {
        setDersData(data.result);
      } else toast.error("Verileri alırken bir hata ile karşılaşıldı.")
      setLoading(false);
      console.log('result', data)
    };

    getData();
  }, [])

  return (
    <>
      <div className="w-full h-full flex flex-col gap-8 items-center justify-center">
        <div className="p-4 bg-white rounded-md shadow">
          <Link href={"/questions/add"} className="px-4 py-2 rounded-md bg-green-600 text-white font-medium">
            Soru Ekle
          </Link>
        </div>
        <div className="p-4 bg-white rounded-md shadow">
          <div className="items-center justify-center w-[800px] grid grid-cols-3 grid-flow-col gap-2">
            {loading ? <>Yükleniyor..</> : <>
              {dersData.length < 1 ? (<>
                Hiç veri bulunamadı
              </>) : (<>
                {dersData.map((data, index) => <div key={data.id} className="w-60 bg-zinc-100 border-zinc-400/20 rounded-md flex flex-col h-64 justify-between px-2 py-4">
                  <div>
                    <div className="text-[15px]">
                      <h1>{data.soru.stringValue}</h1>
                    </div>

                    <div className="mt-2 text-sm flex flex-col gap-1 w-full justify-evenly">
                      <div className="flex justify-around items-center">
                        <span className={`flex items-center justify-center ${data?.cevapDogru?.stringValue == "a" ? "font-medium" : ""}`}>{"A) " + data.cevapA.stringValue}</span>
                        <span className={`flex items-center justify-center ${data?.cevapDogru?.stringValue == "b" ? "font-medium" : ""}`}>{"B) " + data.cevapB.stringValue}</span>
                      </div>
                      <div className="flex justify-around items-center">
                        <span className={`flex items-center justify-center ${data?.cevapDogru?.stringValue == "c" ? "font-medium" : ""}`}>{"C) " + data.cevapC.stringValue}</span>
                        <span className={`flex items-center justify-center ${data?.cevapDogru?.stringValue == "d" ? "font-medium" : ""}`}>{"D) " + data.cevapD.stringValue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full mt-4 justify-between gap-2 items-center">
                    <div className="p-2 text-xs bg-zinc-200 font-semibold rounded-md">
                      Ders: {{ trk: "Türkçe", mat: "Matematik", prg: "Programlama", web: "Web tasarım", fiz: "Fizik", biy: "Biyoloji", kim: "Kimya" }[data.ders.stringValue]}
                    </div>
                    <div className="p-2 rounded-md text-xs bg-zinc-200 font-semibold">
                      Zorluk: {{ "1": "Kolay", "2": "Orta", "3": "Zor" }[data.zorluk.stringValue]}
                    </div>
                  </div>
                </div>)}
              </>)}
            </>}
          </div>
        </div>
      </div>
    </>
  );
}
