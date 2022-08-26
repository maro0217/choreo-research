import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "next/link";
import { auth } from "src/firebase";


const SignUp: NextPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <div>
        <Group position="center" sx={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit}>
            <TextInput
                placeholder="Your name"
                label="Full name"
                radius="md"
                size="md"
                onChange={(event) => setEmail(event.currentTarget.value)}
                />
            <PasswordInput
                placeholder="Password"
                label="Password"
                description="Password must include at least one letter, number and special character"
                radius="md"
                size="md"
                onChange={(event) => setPassword(event.currentTarget.value)}
                />
            <Button 
                type="submit"
                variant="gradient" 
                gradient={{ from: 'indigo', to: 'cyan' }}
            >
                Submit
            </Button>
            </form>
        </Group>
        <Link href={'/login'}>
            ログインはこちらから
        </Link>

      </div>
    );
  }
  
  export default SignUp;