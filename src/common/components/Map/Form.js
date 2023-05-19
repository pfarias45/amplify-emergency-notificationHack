import React, { useRef } from 'react';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {Card} from '@workday/canvas-kit-react/card';
import {Select, SelectOption} from '@workday/canvas-kit-react/select';
import { getAccessToken } from '../../wcp/WcpTokenStore';


import {TextArea} from '@workday/canvas-kit-react/text-area';

import styled from '@emotion/styled';


  const CardLayout = styled("div") ({
    float: "left",
    paddingLeft: "40px",
    paddingTop: "50px",
    
    width: "600px"

    });


const Form = (props) => {

  const form = useRef();

  const[locationWID, setLocationWID] = React.useState('');
  const[workerWIDs, setWorkerWIDs] = React.useState([]);
  const[type, setType] = React.useState('');
  

  const updateEmergencyRecord = async (emergencyRecordWID, emergencyParticipantsArr) => {
  }


// kicks off business process

const createEmergencyParticipants = async (workerWIDs, emergencyRecordWID) => {

}




const createEmergencyRecord = async (locationWID, type) => {

 
  };
  


  
  const triggerBP = async ({locationWID, workerWIDs, type}) => {


    /*
    await fetch('', {
      method: 'POST',
      body: JSON.stringify(),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
         'Authorization': `Bearer ${getAccessToken()}`
      },
   }).then((response) => response.json())
      .then((data) => {
          console.log(data);
      })
      .catch((err) => {
         console.log(err.message);
      });


*/

      const  currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      //const formattedDate = year + '-' + month + '-' + day;
      const formattedDate = month + '/' + day + '/' + year;
    
      const emergencyRecord = {
          "emergencyNumber": "Test R8",
          "emergencyLocation": {
            "id": locationWID
          },
          "emergencyType": type,
          "emergencyDate": formattedDate
          };
    
    // create emergency record
   let emergencyRecordWID; 
    
    await fetch('https://api.workday.com/apps/well_wcvyrz/v1/emergencyRecords', {
            method: 'POST',
            body: JSON.stringify(emergencyRecord),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
               'Authorization': `Bearer ${getAccessToken()}`
            },
         }).then((response) => response.json())
            .then((data) => {
                emergencyRecordWID = data.id;
            })
            .catch((err) => {
               console.log(err.message);
            });


    // creates participant objs
    const arrPOST = await workerWIDs.map( wid => ( { worker: { id: wid }, emergencyRecord: { id: emergencyRecordWID }, isSafe: "" } ) );

    
 
   console.log(arrPOST);
 
  // create emergency participant
  const participants = await fetch('https://api.workday.com/apps/well_wcvyrz/v1/emergencyParticipants?bulk=true', {
     method: 'POST',
     body: JSON.stringify({"data": arrPOST}),
     headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${getAccessToken()}`
     },
  }).then((response) => response.json())
     .then((data) => {
         console.log(data);
         return data; })
     .catch((err) => {
        console.log(err.message);
     })
  

   // update emergency record
  const emergencyRecordUpdate = {
    "id": emergencyRecordWID,
    "emergencyParticpants": {
      participants
    }
  };

  await fetch('https://api.workday.com/apps/well_wcvyrz/v1/emergencyRecords', {
    method: 'PATCH',
    body: JSON.stringify(emergencyRecordUpdate),
    headers: {
       'Content-type': 'application/json; charset=UTF-8',
       'Authorization': `Bearer ${getAccessToken()}`
    },
 }).then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
       console.log(err.message);
    });

  }

const handleSubmit = (e) => {
  e.preventDefault();
  triggerBP(locationWID, workerWIDs, type);
  console.log(workerWIDs);
};    

 return (
      <CardLayout>


      <form onSubmit={handleSubmit} id="emailForm" ref={form} >

            <FormField label="Location of Emergency:" required={true}>
                    <TextInput placeholder="Select a marker to get location name" 
                    value={props.locationName ? props.locationName : ''}
                    onChange= { (e) => setLocationWID([props.locationWID])}/>
            </FormField>
            <FormField label="Workers to Alert:" required={true} >
                <TextArea  value={props.workerNames ? props.workerNames : ''}
                onChange= { (e) => setWorkerWIDs([props.workerWIDs]) }
                  />
                
            </FormField>

            <FormField label="Location of Emergency:" required={true}>
                    <TextInput value="Fire"
                    onChange= { (e) => setType([e.target.value]) }
                    />
            </FormField>
           
        <PrimaryButton>Send Alert</PrimaryButton>
    </form>
    </CardLayout>
  
 )

}
 


  
    // add a function 
// LOCATION (dropdown) - function to call the locations data source to get the business "SELECT locationName, WID from locations(locationUsage= Business_Site)"
//WORKER WID
//TYPE OF EMERGENCY
//LANGUAGE - english / portuguese or hindi

 
export default Form;
 



/*



  

    /*

            response.data).forEach (instance => {
            emergencyParticipantsArr.emergencyParticipants.push({
              "id": instance.id 
            } )

          


       <FormField onChange={handleChange} label="Email Templates">
          <Select >
            <SelectOption label="Small" value="small" />
            <SelectOption label="Medium" value="medium" />
            <SelectOption label="Large" value="large" />
          </Select>
        </FormField>

        <FormField label="Email:" required={true}
                error={FormField.ErrorType.Error}
                hintId="hint-error"
                hintText="Please enter a valid email."
                >
                <TextInput value={props.emails? props.emails : ''} />
                
            </FormField>

  import {DndContext} from '@dnd-kit/core';
  import {Draggable} from './Draggable';
  import {Droppable} from './Droppable';
  
  const MessageDrop = () => {
    const [parent, setParent] = React.useState(null);
    const draggable = (
      <Draggable id="draggable">
        Fire Template
      </Draggable>
    );
  
    return (
      <DndContext onDragEnd={handleDragEnd}>
        {!parent ? draggable : null}
        <Droppable id="droppable">
          {parent === "droppable" ? draggable : 'Drop here'}
        </Droppable>
      </DndContext>
    );
  
    function handleDragEnd({over}) {
      setParent(over ? over.id : null);
    }
  }

  ///////////
        
<div id="drag-smile"draggable="true"><img  alt= "" src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f600.svg" width="32"/> Drag Me to insert a smile.</div><br/>
      <div id="drag-text"  draggable="true" >Drag Me to insert some text.</div><br/>
      <div id="froala-editor">
        <h3>Click here to edit the content</h3>
        <p>Drag the image above or the text block to insert them in the editor.</p>
      
      </div>

    </div>


   <h2>All fields are required.</h2>
        <form id="emailForm" ref={form} onSubmit={sendEmail}>
            <label for="user_email"><font size="5">Email: </font></label> <br/>
            <textarea id="user_email" defaultValue={props.emails? props.emails : ''} name="user_email" required/> <br/> <br/>
            <label for="subject"><font size="5">Subject: </font></label> <br/>
            <input placeholder="Important: Subject" id="subject" type="text" name="subject" required/> <br/> <br/>
            <FroalaEditor id="message" tag='textarea'/> <br/>
            <PrimaryButton>Submit</PrimaryButton>
          </form>



 const addEditor = () => {


   const dragCallback = function (e) {
  e.dataTransfer.setData('Text', this.id);
};
  new FroalaEditor('div#froala-editor', {
    events: {
      initialized: function () {
        var editor = this;
  
        editor.events.on('drop', function (dropEvent) {
          // Focus at the current posisiton.
          editor.markers.insertAtPoint(dropEvent.originalEvent);
          var $marker = editor.$el.find('.fr-marker');
          $marker.replaceWith(FroalaEditor.MARKERS);
          editor.selection.restore();
  
          // Save into undo stack the current position.
          if (!editor.undo.canDo()) editor.undo.saveStep();
  
          // Insert HTML.
          if (dropEvent.originalEvent.dataTransfer.getData('Text') == 'drag-smile') {
            editor.html.insert('<span class="fr-emoticon fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f600.svg)">&nbsp;</span>');
          }
          else {
            editor.html.insert('Hello!');
          }
  
          // Save into undo stack the changes.
          editor.undo.saveStep();
  
          // Stop event propagation.
          dropEvent.preventDefault();
          dropEvent.stopPropagation();
  
          // Firefox show cursor.
          if (editor.core.hasFocus() && editor.browser.mozilla) {
            editor.events.disableBlur();
            setTimeout(function () {
              editor.$el.blur().focus();
              editor.events.enableBlur();
            }, 0);
          }
  
          return false;
        }, true);
      }
    }
  })
 }

    <form position id="emailForm" ref={form} >

        <FormField label="user_email" required={true}
                error={FormField.ErrorType.Error}
                hintId="hint-error"
                hintText="Please enter a valid email."
                >
                <TextInput value={props.emails? props.emails : ''} name="user_email"  />
                
            </FormField>
            <FormField label="subject" required={true} >
                <TextInput placeholder="Important: Subject" />
            </FormField>
            <FormField label="Message" required={true} >
                <TextInput />
            </FormField>

            <PrimaryButton onClick={sendEmail}>Submit</PrimaryButton>

      </form>

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

 
const EmailContactForm = (props) => {
 const form = useRef();
 
 const sendEmail = (e) => {
   e.preventDefault(); // prevents the page from reloading when you hit “Send”
 
   emailjs.sendForm('service_nb55kr3', 'template_ho1f96o', form.current, 'CqUPFoatVjGnjZOQv')
     .then((result) => {
        alert('Message sent!')
        document.getElementById('emailForm').reset();
         // show the user a success message
     }, (error) => {
         // show the user an error
         alert('Error sending message!')
     });
 };
 
 return (
   <form id="emailForm" ref={form} onSubmit={sendEmail}>
    <label>Email</label>
     <input type="text" defaultValue={props.emails? props.emails : ''} name="user_email" />
     <label>Subject</label>
     <input type="text" name="subject" />
     <label>Message</label>
     <textarea name="message" />
     <input type="submit" value="Send" />
   </form>
 );
};
 
export default EmailContactForm;
 */






