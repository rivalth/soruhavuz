import { addData } from "@/lib/firestore/addData";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

export default function QuestionAdd() {
    const router = useRouter();


    // States
    const [ders, setDers] = useState("mat");
    const [zorluk, setZorluk] = useState("1");

    const [soru, setSoru] = useState("");

    const [cevapA, setCevapA] = useState("");
    const [cevapB, setCevapB] = useState("");
    const [cevapC, setCevapC] = useState("");
    const [cevapD, setCevapD] = useState("");

    const [cevapDogru, setCevapDogru] = useState("a");

    const [progress, setProgress] = useState(false);

    const onClickGeri = () => router.push("/");
    const onChanceDers = (event) => setDers(event.target.value);
    const onChanceZorluk = (event) => setZorluk(event.target.value);
    

    const handleSubmit = () => {
        /*
            console.log('ders', ders)
            console.log('zorluk', zorluk)
            console.log('soru', soru)
            console.log('cevapA', cevapA)
            console.log('cevapB', cevapB)
            console.log('cevapC', cevapC)
            console.log('cevapD', cevapD)
        */
        if (!ders) return toast.error("Ders Seçmeniz gerekiyor.");
        if (!zorluk) return toast.error("Zorluk Seçmeniz gerekiyor.");
        if (!soru) return toast.error("Bir soru içeriği yazmalısınız.");
        if (!cevapA || !cevapB || !cevapC || !cevapD) return toast.error("Cevapları eksiksiz yazmalısınız.");
        if(!cevapDogru) return toast.error("Doğru olan cevabı kutucuktan seçmelisiniz.")
        setProgress(true);
        addData('ders', {
            ders,
            zorluk,
            soru,
            cevapA,
            cevapB,
            cevapC,
            cevapD,
            cevapDogru
        }).then((result) => {
            if (result.result) {
                setDers("mat");
                setZorluk("1");
                setSoru("");
                setCevapA("");
                setCevapB("");
                setCevapC("");
                setCevapD("");
                setCevapDogru("a")
                toast.success("Soru başarılı bir şekilde havuza eklendi.");
            } else toast.error("Soru eklenirken bir hata ile karşılaşıldı.");
            console.log(result)
            setProgress(false);
        })

    }
    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center gap-8">
                <div className="p-4 bg-white rounded-md shadow">
                    <h1 className="font-bold text-xl tracking-wide ">
                        Havuza Soru Ekle
                    </h1>
                </div>
                <div className="p-4 flex flex-col gap-8 bg-white rounded-md shadow w-96">
                    <div className="flex flex-col gap-2">
                        <select onChangeCapture={onChanceDers} value={ders} className="select w-full bg-zinc-100 border-zinc-500/20">
                            <option defaultValue disabled>Ders</option>
                            <option value="mat">Matematik</option>
                            <option value="trk">Türkçe</option>
                            <option value="prg">Programlama</option>
                            <option value="web">Web tasarım</option>
                            <option value="fiz">Fizik</option>
                            <option value="biy">Biyoloji</option>
                            <option value="kim">Kimya</option>
                        </select>
                        <select onChangeCapture={onChanceZorluk} value={zorluk} className="select w-full bg-zinc-100 border-zinc-500/20">
                            <option defaultValue disabled>Soru Zorluğu</option>
                            <option value="1">Kolay</option>
                            <option value="2">Orta</option>
                            <option value="3">Zor</option>
                        </select>
                    </div>

                    <textarea onChangeCapture={(e) => setSoru(e.target.value)} value={soru} className="textarea textarea-bordered w-full min-h-60" placeholder="Soru içeriğini buraya yazınız."></textarea>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex gap-2 w-full">
                            <input onChangeCapture={(e) => setCevapA(e.target.value)} value={cevapA} type="text" placeholder="A Şıkkının Cevabı" className="input input-bordered w-full max-w-xs" />
                            <input onChangeCapture={(e) => setCevapB(e.target.value)} value={cevapB} type="text" placeholder="B Şıkkının Cevabı" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="flex gap-2 w-full">
                            <input onChangeCapture={(e) => setCevapC(e.target.value)} value={cevapC} type="text" placeholder="C Şıkkının Cevabı" className="input input-bordered w-full max-w-xs" />
                            <input onChangeCapture={(e) => setCevapD(e.target.value)} value={cevapD} type="text" placeholder="D Şıkkının Cevabı" className="input input-bordered w-full max-w-xs" />
                        </div>
                    </div>
                    <span className="text-sm text-zinc-600 font-medium -mt-5">Doğru cevap?</span>
                    <select onChangeCapture={(e) => setCevapDogru(e.target.value)} value={cevapDogru} className="-mt-6 select w-full bg-zinc-100 border-zinc-500/20">
                            <option value="a">A Şıkkı</option>
                            <option value="b">B Şıkkı</option>
                            <option value="c">C Şıkkı</option>
                            <option value="d">D Şıkkı</option>
                        </select>


                    <div className="flex gap-2 w-full">
                        <button className="btn w-[50%] hover:bg-red-600 hover:text-white" onClick={onClickGeri}>Geri Git</button>
                        <button className={`btn w-[50%] hover:bg-green-600 hover:text-white ${progress ? "disabled pointer-events-none" : ""}`} onClick={handleSubmit}>Havuza Ekle</button>
                    </div>
                </div>
            </div>
        </>
    );
}
