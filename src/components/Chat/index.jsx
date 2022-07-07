import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';

import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';


import './style.scss';

function Chat(){




    return(
        <div >
            <Widget 
                title="پشتیبانی ایرانگرد"
                subtitle="هر سوالی داری بپرس"
                senderPlaceHolder="سوالت رو بپرس !!!"
            />
        </div>
    )
}

export default Chat;