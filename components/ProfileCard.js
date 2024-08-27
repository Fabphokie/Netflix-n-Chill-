import Image from "next/Image";
import {useRouter} from "next/router";

export default function ProfileCard({ profile }) {
    const router = useRouter();

    const handleClick = () => {
        router.push('/preview')
    }

    return (
        <div className="cursor-pointer" onClick={handleClick}>
            <Image src={profile.image} width={100} height={100} />
            <h3 className="text-center mt-2 text-xl font-semibold">{profile.name}</h3>
        </div>

    )
}