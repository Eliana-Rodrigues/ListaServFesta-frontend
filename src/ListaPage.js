import React, { useState, useMemo } from 'react';
import Header from './Header';
import Api from './Api';
import { Table, TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core'; 
import DeleteIcon from '@material-ui/icons/Delete';

function ListaPage() { 

    const [ ListaServFesta, setListaServFesta ] = useState([]);
    const [ bebida, setBebida ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ marca, setMarca] = useState('');
    const [ valor, setValor ] = useState(0);
    const [ volume, setVolume ] = useState('');
    const [ quantidade, setQuantidade ] = useState(0);
    const [ id, setId ] = useState(0);
    

    async function loadData() { 

       const response = await Api.get('/bebidas');
            const ListaServFesta = response.data;
            setListaServFesta(ListaServFesta);
    }

    useMemo(loadData, []);

    function openDialog() { 
        setOpen(true);
    }

     function closeDialog() {
        setOpen(false);
    }

    async function salvar() { 
        if(id === 0) {
        await Api.post('/bebidas', { bebida, marca, valor, volume, quantidade }); 
        }
        else {
             await Api.put(`/bebidas/${id}`, { bebida, marca, valor, volume, quantidade });
        }

        loadData();
        setBebida('');
        setMarca('');
        setValor('');
        setVolume();
        setQuantidade();
        setId(0);
        closeDialog();
    }

      async function apagar(id) {
        await Api.delete(`/bebidas/${id}`);
        loadData();
    }

    async function editar(listaservfesta) {
        setBebida(listaservfesta.produto);
        setMarca(listaservfesta.marca);
        setValor(listaservfesta.valor);
        setVolume(listaservfesta.volume);
        setQuantidade(listaservfesta.quantidade);
        setId(listaservfesta.id);
        openDialog();
    }

  return (
        <>
            <Header />
            <Table style={{ marginTop: '80px' }}>

                {
                ListaServFesta.map(bebida => (
                    <TableRow>
                        <TableCell>{bebida.id}</TableCell>
                        <TableCell>{bebida.bebida}</TableCell>
                        <TableCell>{bebida.marca}</TableCell>
                        <TableCell>{bebidao.valor}</TableCell>
                        <TableCell>{bebida.volume}</TableCell>
                        <TableCell>{bebida.quantidade}</TableCell>
                         <TableCell>
                             <Button variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={() => apagar(bebida.id)}>
                                    <DeleteIcon />Apagar
                                    </Button>
                         </TableCell>
                            <TableCell>
                                <Button variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={() => editar(bebida)}>
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </Table>
        <Button
                onClick={openDialog}
                variant="contained"
                color="primary">Adicionar</Button>

        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>{id === 0 ? 'Novo': 'Editar'} Item </DialogTitle>
            <DialogContent>{id === 0 ? 'Cadastrar': 'Edita'} Nova Bebida:
                <TextField
                    autoFocus
                    margin="dense"
                    id="bebida"
                    label="bebida"
                    type="text"
                    fullWidth
                    value={produto}
                    onChange={e => setBebida(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="marca"
                    label="Marca"
                    type="text"
                    fullWidth
                    value={marca}
                    onChange={e => setMarca(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="Valor"
                    label="Valor"
                    type="text"
                    fullWidth
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="Volume"
                    label="Volume"
                    type="text"
                    fullWidth
                    value={volume}
                    onChange={e => setVolume(e.target.value)}
                />
                 <TextField
                    margin="dense"
                    id="Quantidade"
                    label="Quantidade"
                    type="text"
                    fullWidth
                    value={quantidade}
                    onChange={e => setQuantidade(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancelar</Button>
                <Button onClick={salvar}>{id === 0 ? 'Salvar' : 'Atualizar'}</Button>
            </DialogActions>
        </Dialog>

        
    </>
  )

}

export default ListaPage;