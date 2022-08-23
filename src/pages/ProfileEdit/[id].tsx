import { Button, Group, MultiSelect, Select, TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useAuthContext } from "src/AuthContext";
import { addUser, UserObj } from "src/utils/firestore";


const prefecture = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
"茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
"新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
"静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
"奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
"徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
"熊本県","大分県","宮崎県","鹿児島県","沖縄県"];

const ProfileEdit = () => {
    const [userobj, setUserObj] = useState<UserObj>({
        id: '',
        name: '',
        type: '',
        style: [],
        place: '',
    });
    const { user } = useAuthContext();
    const router = useRouter();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            addUser(userobj);

        } catch (error) {
            console.log(error);
        }
        router.push(`/profile/${user?.uid}`)
    }

    return (
        <div>
            <Group  position="center" sx={{ padding: '2rem' }}>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        placeholder="Your name"
                        label="name"
                        onChange={(e) => setUserObj(prev => ({...prev, name: e.currentTarget.value}))}
                    />
                    <Select
                        data={['Dancer', 'Audience']}
                        placeholder="Your type"
                        label="type"
                        onChange={(value) => setUserObj(prev => ({...prev, type: value}))}
                    />
                    <MultiSelect
                        data={['HIPHOP', 'Urban Choreography', 'JAZZ', 'LOCK']}
                        placeholder="Your Style"
                        label="style"
                        onChange={(value) => setUserObj(prev => ({...prev, style: value}))}
                    />
                    <Select
                        data={prefecture}
                        placeholder="Your Place"
                        label="place"
                        onChange={(value) => setUserObj(prev => ({...prev, place: value}))}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Group>
        </div>
    )
}

export default ProfileEdit