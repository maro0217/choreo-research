import {
  Button,
  createStyles,
  Header,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { Select } from "@mantine/core";
import { Search } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    width: "100%",
  },

  headerInner: {
    height: 70,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  SearchBox: {
    width: "35%",
  },

  SelectBox: {
    width: "35%"
  }


}));

export const Heading = (props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const genre = props.categories.map((category) => category.name);

  const handleSubmit = async (e) => {
    const q = e.name;
    const data = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json = await data.json();
    props.setSearch(json.contents);
  };

  const categorySubmit = async (e) => {
    console.log(e);
    const obj = props.categories.filter((data) => data.name === e.genre);
    const id = obj[0].id;
    const data = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json = await data.json();
    props.setSelect(json.contents);
  };


  const form = useForm({
    initialValues: {
      name: "",
      genre: "",
    },
  });

  return (
    <div>
      <Header className={classes.header}>
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
              <Button type="submit" variant="outline" radius="xl" size="xs" compact>Submit</Button>
            </form>
          </div>
      </Header>
    </div>
  );
};
