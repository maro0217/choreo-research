import { createStyles } from "@mantine/core";

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
      width: "30%",
    },
  
    SelectBox: {
      width: "30%"
    },
    
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
      },
    
      name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      },
    
  
  
  }));

export default useStyles;
