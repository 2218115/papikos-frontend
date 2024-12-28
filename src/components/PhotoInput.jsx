import IonIcon from "@reacticons/ionicons";

const PhotoInput = ({ id, label, onChange, src, isError, errorHint }) => {
    return (
        <div className="mb-4">
            {label && <label className="text-sm mb-2 text-gray-500">{label}</label>}
            <div className={`w-full h-48 border rounded-lg overflow-hidden flex justify-center items-center relative ${isError ? "border border-red-500" : "border border-zinc-200"}`}>
                {
                    src &&
                    <img
                        src={src}
                        alt="Foto Identitas"
                        className="w-full h-full object-cover left-0 right-0 bottom-0 top-0 absolute"
                    />
                }
                < label
                    htmlFor={id}
                    className="z-10 hover:bg-black/10 w-full h-full flex justify-center items-center duration-300 cursor-pointer"
                >
                    {
                        !src &&
                        <div className=" border border-blue-500 w-fit rounded-full p-4 flex items-center justify-center hover:bg-blue-500 hover:text-white text-blue-500 cursor-pointer">
                            <IonIcon name="add" className="m-0 font-bold text-lg z-" size="24" />
                        </div>
                    }
                </label>
                <input
                    type="file"
                    id={id}
                    hidden
                    onChange={onChange}
                />
            </div>
            {isError && errorHint && (
                <span className="text-xs text-red-500 mt-1">{errorHint}</span>
            )}
        </div >
    )
}

export default PhotoInput;