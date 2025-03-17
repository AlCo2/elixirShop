
export default function SectionBanner({title, text}){
    return (
      <div className="text-center mt-11 rounded-md py-2 mx-4 text-black">
        <h1 className="text-5xl font-Italiana font-bold max-sm:text-4xl max-xs:text-3xl">{title}</h1>
        <div className="flex justify-center text-center">
          <p className="font-Opensans w-80">{text}</p>
        </div>
      </div>
    )
}