import { Avatar, Text, Group } from '@mantine/core';
import { NextPage } from 'next';
import useStyles from 'src/styles/useStyles';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { useGetUser } from 'src/utils/firestore';




const Profile: NextPage = () => {
  const { classes } = useStyles();
  const [data, setData] = useState<DocumentData>()
  useGetUser('users').then((doc) => {
    setData(doc)
  }).catch(e => {
    console.log(e)
  }) ;
    return (
      <div>
            <Group noWrap position='center'>
              <Avatar size={94} radius="md" />
              <div>
                <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                  {data?.type}
                </Text>
  
                <Text size="lg" weight={500} className={classes.name}>
                  {data?.name}
                </Text>
  
                <Group noWrap spacing={10} mt={3}>
                  <Text size="xs" color="dimmed">
                    {data?.style}
                  </Text>
                </Group>
  
                <Group noWrap spacing={10} mt={5}>
                  <Text size="xs" color="dimmed">
                    {data?.place}
                  </Text>
                </Group>
          </div>
        </Group>
      </div>
    );
  }


export default Profile;


