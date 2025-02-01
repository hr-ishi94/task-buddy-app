

type CircleTypes={

  section:'full' | 'r-full' |'bl-full'

} 
const Circles: React.FC<CircleTypes> = ({ section } ) => {
  return (
        <div className={`border-2 border-customPurple w-full h-full  rounded-${section} border-opacity-30 flex flex-col items-center justify-center p-9`}>
            <div className={`border-2 border-customPurple w-full h-full  rounded-${section} border-opacity-35 flex flex-col items-center justify-center p-12`}>
                <div className={`border-2 border-customPurple w-full h-full  rounded-${section} border-opacity-55`} >
                </div>
            </div>
        </div>
  )
}

export default Circles