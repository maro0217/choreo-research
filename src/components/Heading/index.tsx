import {
  Button,
  Header,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { FC } from "react";
import { Select } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { Category } from "src/types/category";
import { useSearchDispatch } from "src/state/search";
import useStyles from 'src/styles/useStyles'
import { UserMenu } from "../UserMenu/UserMenu";


type Props = {
  categories: Category[];
}


export const Heading: FC<Props> = (props: Props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const genre = props.categories.map(category => category.name);
  
  const { setSearch, setSelect } = useSearchDispatch();



  

  const handleSubmit = async (e: Form) => {
    try {
      const q = e.name;
      const data = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ q }),
      });
      const json = await data.json();
      setSearch(json.contents);  
    } catch (e) {
      console.log(e);
    }
  };


  const categorySubmit = async (e: Form) => {
    try {
      const obj = props.categories.filter((data) => data.name === e.genre);
      const id = obj[0].id;
      const data = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await data.json();
      setSelect(json.contents);
      } catch (error) {
      console.log(error);
    }
  };

  type Form = {
    name: string;
    genre: string
  }


  const form = useForm<Form>({
    initialValues: {
      name: "",
      genre: "",
    },
  });

  return (
    <div>
      <Header className={classes.header} height={60}>
        <div className={classes.headerInner}>
          <Title order={1}>
            Cho<a style={{ color: theme.colors.blue[3] }}>reo</a> Search
          </Title>
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className={classes.SearchBox}
          >
            <TextInput
              placeholder="どんなコレオをお探しですか？"
              {...form.getInputProps("name")}
              icon={<Search size={18} />}
            />
          </form>
          <form
              onSubmit={form.onSubmit(categorySubmit)}
              className={classes.SelectBox}
              >
              <Select
                data={genre}
                placeholder="お探しのスタイルはどれですか？"
                {...form.getInputProps("genre")}
              />
              <Button type="submit" variant="outline" radius="xl" size="xs" compact>カテゴリ検索</Button>
          </form>
          <UserMenu/>
        </div>
      </Header>
    </div>
  );
};

