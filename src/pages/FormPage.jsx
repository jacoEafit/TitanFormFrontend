import { Paper, Button, Typography, TextField, Box, Snackbar, Alert, Divider, Chip, FormControl, InputLabel, OutlinedInput,Select,MenuItem,Collapse,FormHelperText} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LogoAppBar } from '../components/TitanFormBar';
import { useState } from 'react';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { postFormInfo } from '../apis/forms.api';

export const FormPage = () => {

  //Variables primera parte
  const [nombre,setNombre] = useState(null);
  const [cedula,setCedula] = useState(null);
  const [correo,setCorreo] = useState(null);
  const [telefono,setTelefono] = useState(null);
  const [primeraParte,setPrimeraParte] = useState(true);
  const [openSnackbar1,setOpenSnackbar1] = useState(false);
  const [snackbar1Info,setSnackbar1Info] = useState({message:"",severity:"success"});
  const [errores,setErrores] = useState({});
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;

  const handleSiguiente = ()=>{

    if(!nombre || !cedula || !correo || !telefono){
        setOpenSnackbar1(true);
        setSnackbar1Info({message:"Llena todos los campos para continuar",severity:"warning"});
        return;
    }

    //Validación errores:
    const nuevosErrores = {}
    let hayErrores = false;
    //Campo correo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      nuevosErrores.correo = 'Correo inválido';
      hayErrores = true;
    }

    setErrores(nuevosErrores);
    if(!hayErrores){setPrimeraParte(false);} //Si no hay errores
    
  }

  //Variables segunda parte
  const [respuestaPregunta1,setRespuestaPregunta1] = useState(null);
  const [respuestaPregunta2,setRespuestaPregunta2] = useState(null);
  const [respuestaPreguntaA,setRespuestaPreguntaA] = useState(null);
  const [respuestaPreguntaB,setRespuestaPreguntaB] = useState(null);
  const [respuestaPreguntaC,setRespuestaPreguntaC] = useState(null);
  const [respuestaPreguntaComentarios,setRespuestaPreguntaComentarios] = useState(null);

  const handleCambioPregunta2 = (e) => {
    if(respuestaPregunta2 == "si"){
        setRespuestaPreguntaC(null);
    }
    if(respuestaPregunta2 == "no"){
        setRespuestaPreguntaA(null);
        setRespuestaPreguntaB(null);
    }
    setRespuestaPregunta2(e.target.value)
  }

  //Lógica envio formulario a backend:
  const handleEnvioFormulario = async() => {
    //Si hay campos nulos se hace warning
    if(!respuestaPregunta1 || !respuestaPregunta2 || !respuestaPreguntaComentarios || (respuestaPregunta2 == "si" && (respuestaPreguntaA == null || respuestaPreguntaB == null)) || (respuestaPregunta2 == "no" && respuestaPreguntaC == null)){
        setOpenSnackbar1(true);
        setSnackbar1Info({message:"Llena todos los campos para continuar",severity:"warning"});
        return;
    }

    const jsonFormulario = {
        nombre_completo: nombre,
        cedula: cedula,
        correo_electronico: correo,
        telefono: telefono,
        respuesta_pregunta1:respuestaPregunta1,
        respuesta_pregunta2:respuestaPregunta2,
        respuesta_preguntaA:respuestaPreguntaA,
        respuesta_preguntaB:respuestaPreguntaB,
        respuesta_preguntaC:respuestaPreguntaC,
        respuesta_pregunta_comentarios:respuestaPreguntaComentarios
    }

    try{
        const response = await postFormInfo(jsonFormulario);
        window.location.href = 'https://www.google.com';
    }catch(error){
        setOpenSnackbar1(true);
        setSnackbar1Info({message:"El backend rechazó la conexión",severity:"error"});
        return;
    }
  }
  

  
  //Componentes react:
  return (
    <>
    <LogoAppBar/>

    {primeraParte && (
    <Box
        sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 6,
        }}
    >
        <Paper
        elevation={1}
        sx={{
            p: 4,
            width: '100%',
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: '#f4f5f7',
        }}
        >
        <Typography
            variant="h5"
            align="center"
            color="primary"
            sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            }}
        >
            Encuesta de satisfacción
        </Typography>

        <Divider>
            <Chip label="Datos personales" size="small" />
        </Divider>

        <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
            <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Nombre completo
            </Typography>
            <OutlinedInput
                value={nombre}
                onChange={(e) => {
                const valor = e.target.value;
                if (soloLetras.test(valor)) {
                    setNombre(valor);
                }
                }}
                color="primary"
            />
            <FormHelperText>{' '}</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
            <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Cédula
            </Typography>
            <OutlinedInput
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                color="primary"
            />
            <FormHelperText>{' '}</FormHelperText>
            </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth error={Boolean(errores.correo)}>
            <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Correo electrónico
            </Typography>
            <OutlinedInput
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                color="primary"
            />
            <FormHelperText>{errores.correo || ' '}</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
            <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Teléfono
            </Typography>
            <OutlinedInput
                value={telefono}
                onChange={(e) => {
                const valor = e.target.value;
                if (/^\d*$/.test(valor)) {
                    setTelefono(valor);
                }
                }}
                color="primary"
            />
            <FormHelperText>{' '}</FormHelperText>
            </FormControl>
        </Box>

        <Box
            sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
            }}
        >
            <Button
            variant="contained"
            color="titanGreen"
            endIcon={<ArrowForwardIcon />}
            sx={{ borderRadius: '30px', px: 3 }}
            onClick={() => handleSiguiente()}
            >
            Siguiente
            </Button>
        </Box>
        </Paper>
    </Box>
    )}


    {/* Parte 2 del formulario */}
    { !primeraParte && (<Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 6,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor:'#f4f5f7',
        }}
      >
        
        <Divider>
            <Chip label="Encuesta" size="small" />
        </Divider>

        {/* Pregunta 1 */}
        <FormControl fullWidth>
            <Typography sx={{ mb: 1 }}>
                En relación a esta compra, ¿qué opinión tienes sobre la atención que recibiste del asesor?
            </Typography>

            <Select
                labelId="opinion-label"
                id="opinion-select"
                value={respuestaPregunta1}
                onChange={(e) => setRespuestaPregunta1(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                switch (selected) {
                    case 'excelente':
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SentimentVerySatisfiedIcon color="success" sx={{ mr: 1 }} />
                        Excelente
                        </Box>
                    );
                    case 'bueno':
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SentimentSatisfiedIcon color="primary" sx={{ mr: 1 }} />
                        Bueno
                        </Box>
                    );
                    case 'regular':
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SentimentNeutralIcon color="warning" sx={{ mr: 1 }} />
                        Regular
                        </Box>
                    );
                    case 'malo':
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SentimentVeryDissatisfiedIcon color="error" sx={{ mr: 1 }} />
                        Malo
                        </Box>
                    );
                    default:
                    return <em style={{ color: '#888' }}>Selecciona una opción</em>; // 👈 mismo estilo que usaste antes
                }
                }}
            >
                <MenuItem value="excelente">
                <SentimentVerySatisfiedIcon color="success" sx={{ mr: 1 }} />
                Excelente
                </MenuItem>
                <MenuItem value="bueno">
                <SentimentSatisfiedIcon color="primary" sx={{ mr: 1 }} />
                Bueno
                </MenuItem>
                <MenuItem value="regular">
                <SentimentNeutralIcon color="warning" sx={{ mr: 1 }} />
                Regular
                </MenuItem>
                <MenuItem value="malo">
                <SentimentVeryDissatisfiedIcon color="error" sx={{ mr: 1 }} />
                Malo
                </MenuItem>
            </Select>
        </FormControl>

        <Divider></Divider>

        {/*Pregunta 2*/}
        <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
                <Typography sx={{ mb: 1 }}>
                ¿Contaste con la asistencia de un asesor?
                </Typography>

                <Select
                value={respuestaPregunta2}
                onChange={(e) => handleCambioPregunta2(e)}
                displayEmpty
                renderValue={(selected) => {
                    if (selected === null) {
                    return <em style={{ color: '#888' }}>Selecciona una opción</em>;
                    }
                    return selected === "si" ? "Sí" : "No";
                }}
                >
                <MenuItem value="si">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
                </Select>
            </FormControl>
        </Box>



        
        <Box>
            {/*Preguntas si asesor == si*/}
            <Collapse in={respuestaPregunta2 === 'si'} >

                {/*Pregunta A*/}
                <Box sx={{ mt: 3 }}>
                    <FormControl fullWidth>
                        <Typography sx={{ mb: 1 }}>
                        ¿La información que te dio el asesor fue fácil de entender en cuanto al valor de la cuota y el plazo?
                        </Typography>

                        <Select
                        value={respuestaPreguntaA}
                        onChange={(e) => setRespuestaPreguntaA(e.target.value)}
                        displayEmpty
                        renderValue={(selected) =>
                            selected === null ? <em style={{ color: '#888' }}>Selecciona una opción</em> : selected === 'si' ? 'Sí' : 'No'
                        }
                        >
                        <MenuItem value="si">Sí</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                
                {/*Pregunta B*/}
                <Box sx={{ mt: 3 }}>
                    <FormControl fullWidth>
                        <Typography sx={{ mb: 1 }}>
                        ¿Fue el asesor amable y paciente al responder tus preguntas?
                        </Typography>

                        <Select
                        value={respuestaPreguntaB}
                        onChange={(e) => setRespuestaPreguntaB(e.target.value)}
                        displayEmpty
                        renderValue={(selected) =>
                            selected === null ? <em style={{ color: '#888' }}>Selecciona una opción</em> : selected === 'si' ? 'Sí' : 'No'
                        }
                        >
                        <MenuItem value="si">Sí</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>
                </Box>


            </Collapse>
            
            {/*Preguntas si asesor == no*/}
            <Collapse in={respuestaPregunta2 === 'no'}>
                {/*Pregunta C*/} 
                <Box sx={{ mt: 3 }}>
                    <FormControl fullWidth>
                        <Typography sx={{ mb: 1 }}>
                        ¿La cajera le informó en caja sobre el valor de la cuota y el plazo del crédito?
                        </Typography>

                        <Select
                        value={respuestaPreguntaC}
                        onChange={(e) => setRespuestaPreguntaC(e.target.value)}
                        displayEmpty
                        renderValue={(selected) =>
                            selected === null ? <em style={{ color: '#888' }}>Selecciona una opción</em> : selected === 'si' ? 'Sí' : 'No'
                        }
                        >
                        <MenuItem value="si">Sí</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>
                </Box>


            </Collapse>
        </Box>

        <Divider></Divider>

        {/*Pregunta final (comentarios)*/}
        <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
                <Typography sx={{ mb: 1 }}>
                Agradecemos tus comentarios. ¿En qué aspectos consideras que podríamos mejorar?
                </Typography>

                <TextField
                multiline
                rows={4}
                placeholder="Escribe aquí tus sugerencias..."
                variant="outlined"
                color = 'primary'
                value={respuestaPreguntaComentarios}
                onChange={(e) => setRespuestaPreguntaComentarios(e.target.value)}
                inputProps={{ maxLength: 300 }}
                />
            </FormControl>
        </Box>

        {/* Botones de enviar y anterior */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
          }}
        > 
          <Button
            variant="contained"
            color="titanGreen"
            startIcon={<ArrowBackIcon />}
            sx={{ borderRadius: '30px', px: 3 }}
            onClick = {()=>setPrimeraParte(true)}
        >
            Anterior
          </Button>
          <Button
                variant="contained"
                color="titanGreen"
                endIcon={<ArrowForwardIcon />}
                sx={{ borderRadius: '30px', px: 3 }}
                onClick = {()=>handleEnvioFormulario()}
            >
                Enviar
          </Button>
        </Box>
      </Paper>
    </Box>) }


    {/* SnackBar */}

    <Snackbar open={openSnackbar1} autoHideDuration={5000} onClose={()=>setOpenSnackbar1(false)}>
    <Alert
        onClose={()=>setOpenSnackbar1(false)}
        severity={snackbar1Info.severity}
        variant="filled"
        sx={{ width: '100%' }}
    >
        {snackbar1Info.message}
    </Alert>
    </Snackbar>
    
    </>
  );
}