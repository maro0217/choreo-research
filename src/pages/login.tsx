import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { FormEvent, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "src/firebase";
import { useRouter } from "next/router";
import { NextPage } from "next";


const Login: NextPage = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <div>
        <Group>
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

      </div>
    );
  }
  
  export default Login;