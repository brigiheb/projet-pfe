import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';

import Add from '@mui/icons-material/Add';
import {Delete} from "@mui/icons-material"
import { Modal,Box } from '@mui/material';



const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex:-1,
  };
export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [expandedLayer2, setExpandedLayer2] = React.useState('panel11');
  const [libraries, setLibraries] = React.useState([])
  const [open,setOpen] = React.useState(null)
  const [openChoix,setOpenChoix] = React.useState(null)
  const [questionSelected, setQuestionSelected] = React.useState(null)
  const [stateQuestion, setStateQuestion] = React.useState(null)
  const [stateChoix, setStateChoix] = React.useState(null)

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChangeLayer2 = (panel) => (event, newExpanded) => {
    setExpandedLayer2(expandedLayer2 ? panel : false);
  };
  useEffect(()=>{
    async function fetchLibrary(){
        const libraries = await axios.get("http://localhost:5000/libraryGetAll")
        setLibraries(libraries.data)    
    }
    fetchLibrary()
  },[])
  const handleAddQuestion = async(question)=>{
       const newQuestion = await axios.post("http://localhost:5000/questionPost",question)
       libraries.find(library => library.id === question.libraryId).questions.push({...newQuestion.data,choix:[]})
       setLibraries([...libraries])
  }
  const handleAddChoix = async(choix)=>{
       const newChoix = await axios.post("http://localhost:5000/choixPost",choix)
       libraries.find(library => library.id === questionSelected.libraryId).questions.find(question => question.id ===choix.questionId).choix.push(newChoix.data)
       setLibraries([...libraries])
  }
  const handleChangeInputChoix= (e)=>{
      setStateChoix({...stateChoix,[e.target.name]:e.target.value})
  }
  const handleChangeInputQuestion = (e)=>{
      setStateQuestion({...stateQuestion,[e.target.name]:e.target.value})
  }
   const handleDeleteQuestion = async (question)=>{
    await axios.delete("http://localhost:5000/questionDel/"+question.id)
     libraries.find(library => library.id === question.libraryId).questions= libraries.find(library => library.id === question.libraryId).questions.filter(questionx => questionx.id !== question.id)
    setLibraries([...libraries])
   }
   const handleDeleteChoix = async (choix,question)=>{
    await axios.delete("http://localhost:5000/choixDel/"+choix.id)
     libraries.find(library => library.id === question.libraryId).questions.find(questionx => questionx.id === choix.questionId).choix =libraries.find(library => library.id === question.libraryId).questions.find(questionx => questionx.id === choix.questionId).choix.filter(choi => choi.id !== choix.id) 
    setLibraries([...libraries])
   }
  return (
    <div>
        {libraries.map((library => {
            return <Accordion expanded={expanded === library.id} onChange={handleChange(library.id)}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <div style={{width:"90vw",display:"flex",justifyContent:"space-between"}}>
                        <Typography>{library.libraryName}</Typography>
                        <Add onClick ={()=>setOpen(true)}/>
                        <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Question 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            text question : <input type="text" name="question"onChange = {(e)=>{
                handleChangeInputQuestion(e)
            }}/>

          </Typography>
          <button onClick ={async ()=>{
              await handleAddQuestion({question:stateQuestion.question,description:"description",libraryId:library.id})
              setOpen(false)
          }}> Add </button>
        </Box>
      </Modal>
                        </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                  {library.questions.map(question => {
                      return <Accordion expanded={expandedLayer2 === library.id+question.id} onChange={handleChangeLayer2(library.id+question.id)}>
                      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <div style={{width:"90vw",display:"flex",justifyContent:"space-between"}}>
                        <Typography>{question.question}</Typography>
                        <Add onClick ={()=>{
                            setQuestionSelected(question)
                            setOpenChoix(true)
                        }}/>
                        <Delete onClick={()=> {
                            handleDeleteQuestion(question)
                        }}/>
                        <Modal
        open={openChoix}
        onClose={()=>{setOpenChoix(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Choix 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            text choix : <input type="text" name="ajouter" onChange ={(e)=>{
                handleChangeInputChoix(e)
            }}/>

          </Typography>
          <button onClick ={async ()=>{
              await handleAddChoix({ajouter:stateChoix.ajouter,reponse:false,questionId:questionSelected.id})
              setOpenChoix(false)
              setQuestionSelected(null)
          }}> Add </button>
        </Box>
      </Modal>
                        </div>
                       

                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                            {question.choix.map(choi =>{
                                return     <div style={{boxShadow:"1px 1px 5px grey",width:"100%",marginTop:20,display:"flex",flexDirection:"row",alignItems:"center",padding:"5px 20px 5px 20px"}}>
                                <input type="checkbox" defaultChecked={choi.reponse} onChange={(e)=>{
                                  axios.put("http://localhost:5000/choixUp/"+choi.id,{reponse:e.target.checked})
                                }} />
                                <div style={{display:"flex",alignItems:"center",marginLeft:50,fontSize:14}}> {choi.ajouter}</div>
                                <Delete onClick={async ()=> {
                            await handleDeleteChoix(choi,question)
                        }}/>
                            </div>
                            })}
                     
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  })}
            
              </Typography>
            </AccordionDetails>
          </Accordion>
        }))}
 
     
    </div>
  );
}