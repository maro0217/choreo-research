import { Menu, Avatar, } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Feather, LogOut, User } from 'react-feather';
import { useAuthContext } from 'src/AuthContext';
import { app } from 'src/firebase';

export const UserMenu = () => {
  const { user } = useAuthContext();

  const router = useRouter()
  const auth = getAuth(app)
  const handleLogout = async () => {
    console.log('ログアウトします');
    await signOut(auth)
    await router.push("/login")
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar size={40}/>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
          <Menu.Item component={NextLink} href={`/profile/${user?.uid}`} icon={<User size={14} />}>My Page</Menu.Item>
          <Menu.Item component={NextLink} href={`/ProfileEdit/${user?.uid}`} icon={<Feather size={14} />}>Edit User</Menu.Item>

        <Menu.Label>Danger zone</Menu.Label>
          <form onSubmit={handleLogout}>
              <Menu.Item type='submit' icon={<LogOut size={14} />}>LogOut</Menu.Item>
          </form>
      </Menu.Dropdown>
    </Menu>
  );
}