import Image from "next/image";

export default function ComingSoon() {

    return (
        <div

            className="min-h-screen container flex justify-center items-center"
        >
            <Image
                src={'https://i.ibb.co.com/d0YdNV3T/360-F-296694103-s-Xwlj-Vp-U8mp-COp-REQCNUb-HPI0h-Y73fcl.jpg'}
                width={1200}
                height={500}
                alt="coming soon"
                className="w-full md:w-sm h-fitobject-contain"
                draggable={false}
            />

        </div>
    );
}