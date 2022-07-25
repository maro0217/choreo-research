import { createStyles, Header, MultiSelect, TextInput, Title, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form';
import React from 'react'
import { Select } from '@mantine/core';
import { Search } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    header: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      width: '100%'
    },
  
    headerInner: {
      height: 70,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },

    SearchBox: {
        width: '35%'
      },
    
      SelectBox: {
        width: '30%'
      },
}));

export const Heading = (props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const genre = props.categories.map((category) => category.name)
  
  const form = useForm({
      initialValues: {
          name: '', 
          genre: ''
        }
    });

  return (
    <div>
        <Header className={classes.header}>
          <div className={classes.headerInner}>
              <Title order={1}>Cho<a style={{color: theme.colors.blue[3]}}>reo</a> Search</Title>
              <form onSubmit={form.onSubmit(props.handleSubmit)} className={classes.SearchBox}>
                  <TextInput
                      placeholder="どんなコレオをお探しですか？" 
                      {...form.getInputProps('name')} 
                      icon={<Search size={18}/>}
                  />
              </form>
              <form className={classes.SelectBox}>
              <Select
                      data={genre}
                      searchable
                      placeholder="お探しのスタイルはどれですか？"
                      {...form.getInputProps('genre')}
                      onChange={(e) => form.onSubmit(props.categorySubmit(e))}
              /> 
              </form>
          </div>          
        </Header>
    </div>
  )
}

