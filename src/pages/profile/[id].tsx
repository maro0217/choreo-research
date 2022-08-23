import { Avatar, Text, Group } from '@mantine/core';
import { NextPage } from 'next';
import useStyles from 'src/styles/useStyles';
import { getUsers } from 'src/utils/firestore';




const Profile: NextPage = () => {
  const { classes } = useStyles();
  
  console.log(contents);

  return (
    <div>
      <Group noWrap>
        <Avatar size={94} radius="md" />
        <div>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
          </Text>

          <Text size="lg" weight={500} className={classes.name}>
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <Text size="xs" color="dimmed">
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <Text size="xs" color="dimmed">
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}

export default Profile;


