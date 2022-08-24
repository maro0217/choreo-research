import { Avatar, Text, Group } from '@mantine/core';
import { NextPage } from 'next';
import useStyles from 'src/styles/useStyles';
import useSWRImmutable  from "swr/immutable";
import { useGetUser, userConverter, UserObj} from 'src/utils/firestore';
import { useAuthContext } from 'src/AuthContext';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc } from 'firebase/firestore';
import { db } from 'src/firebase';
import useSWR from 'swr';


const useFetcher = async (url: string) => {
  const { user } = useAuthContext();
  try {
    const docs = await useGetUser(url, user?.uid);
    return docs
    
  } catch (error) {
    console.log(error)
  }
// docsはmap関数で展開したときにdocumentidが取り出せるような配列
};


const Profile: NextPage = () => {
  const { classes } = useStyles();
  const { user } = useAuthContext();
  const { data, loading, error } = useSWR('users', useFetcher);


  return (
    <div>
          <Group noWrap>
            <Avatar size={94} radius="md" />
            <div>
              <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                {/* {data?.type} */}
              </Text>

              <Text size="lg" weight={500} className={classes.name}>
                {/* {data?.name} */}
              </Text>

              <Group noWrap spacing={10} mt={3}>
                <Text size="xs" color="dimmed">
                  {/* {data?.style} */}
                </Text>
              </Group>

              <Group noWrap spacing={10} mt={5}>
                <Text size="xs" color="dimmed">
                  {/* {data?.place} */}
                </Text>
              </Group>
        </div>
      </Group>
    </div>
  );
}

export default Profile;


