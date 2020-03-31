import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

import { Paper, Grid, Container, TextField, makeStyles, Tabs, Tab, TabP, AppBar, Typography, Box, Button } from '@material-ui/core'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    codigo_de_fabrica: 0,
    nome_produto: '',
    valor_unitario: 0.00,
    valor_de_venda: 0.00,
    descricao: '',
    tab_pos: 0,
    message: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setValues({ ...values, tab_pos: newValue});
  };

  const save = (e) => {
    Axios.post('http://localhost:8080/save', {
      codigo_de_fabrica: values.codigo_de_fabrica,
      nome_produto: values.nome_produto,
      valor_unitario: values.valor_unitario,
      valor_de_venda: values.valor_de_venda,
      descricao: values.descricao
    }).then(resp => {
      setValues({ ...values, message: "Salvo com sucesso"});
    }).catch(erro => {
      console.error(erro);
      setValues({ ...values, message: "Falha ao salvar"});
    })
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <AppBar position="static">
            <Tabs value={values.tab_pos} onChange={handleTabChange}>
              <Tab label="Criar" {...a11yProps(0)} />
              <Tab label="Procurar" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={values.tab_pos} index={0}>
            <Grid item xs={12}>
              <TextField
                id="codigo_de_fabrica"
                label="Codigo de Fabrica"
                value={values.codigo_de_fabrica}
                onChange={handleChange('codigo_de_fabrica')}
                margin="normal"
              />
              <TextField
                id="nome_produto"
                label="Nome do Produto"
                value={values.nome_produto}
                onChange={handleChange('nome_produto')}
                margin="normal"
              />
              <TextField
                id="valor_unitario"
                label="Valor Unitário"
                value={values.valor_unitario}
                onChange={handleChange('valor_unitario')}
                margin="normal"
              />
              <TextField
                id="valor_de_venda"
                label="Valor de Venda"
                value={values.valor_de_venda}
                onChange={handleChange('valor_de_venda')}
                margin="normal"
              />
              <TextField
                id="descricao"
                label="Descrição"
                value={values.descricao}
                onChange={handleChange('descricao')}
                fullWidth
                multiline
                margin="normal"
              />
              <Button variant="contained" color="primary" className={classes.button} onClick={save}>
                Adicionar
              </Button>
            </Grid>
            <p>{values.message}</p>
          </TabPanel>
          <TabPanel value={values.tab_pos} index={1}>

          </TabPanel>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
