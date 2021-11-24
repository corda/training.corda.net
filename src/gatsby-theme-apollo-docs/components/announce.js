import React from 'react';
import styled from '@emotion/styled';
import useSessionStorage from 'react-use/lib/useSessionStorage';
//import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';

const Wrapper = styled.div({
  'width': '100%',
  'background-color': '#262626',
});




export default function Announce() {
  const [show, setShow] = useSessionStorage('announce-show', 'show');

  function closeAnnounce() {
    document.getElementById('announce').classList.add('hide');
    setShow('hide');
  }

  return (
    <Wrapper>
      <div id="announce" className={show}>
        <img alt="Announce" height="32" src="data:image/svg+xml,%3Csvg width='37' height='32' viewBox='0 0 37 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_401_1727)'%3E%3Cpath d='M20.5041 6.73899C20.5033 5.04349 20.9768 3.38158 21.871 1.94104H5.46775C4.01761 1.94104 2.62687 2.5171 1.60147 3.54251C0.576065 4.56791 0 5.95865 0 7.40879L0 21.0782C0 22.5283 0.576065 23.919 1.60147 24.9444C2.62687 25.9698 4.01761 26.5459 5.46775 26.5459V30.6467C5.47151 30.9143 5.5537 31.1748 5.70415 31.3961C5.85459 31.6174 6.06667 31.7896 6.31409 31.8915C6.56151 31.9934 6.83339 32.0204 7.09602 31.9692C7.35865 31.918 7.60048 31.7909 7.79154 31.6036L12.8492 26.5459H27.3387C28.7889 26.5459 30.1796 25.9698 31.205 24.9444C32.2304 23.919 32.8065 22.5283 32.8065 21.0782V15.296C31.7835 15.6798 30.7005 15.8788 29.6079 15.8838C27.1896 15.873 24.8741 14.9047 23.168 13.1909C21.4619 11.4771 20.504 9.15726 20.5041 6.73899Z' fill='%2388909B'/%3E%3Cpath d='M29.6081 2.77939e-05C27.8715 0.0782193 26.232 0.8231 25.0308 2.07963C23.8296 3.33616 23.1592 5.00753 23.1592 6.74586C23.1592 8.4842 23.8296 10.1556 25.0308 11.4121C26.232 12.6686 27.8715 13.4135 29.6081 13.4917C30.7285 13.4817 31.8284 13.1903 32.8067 12.6442C34.1361 11.941 35.1908 10.8117 35.8017 9.43735C36.4125 8.06304 36.544 6.52341 36.1752 5.0654C35.8064 3.60739 34.9585 2.31552 33.7677 1.39698C32.5768 0.478449 31.112 -0.0135056 29.6081 2.77939e-05Z' fill='%23DADBE3'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_401_1727'%3E%3Crect width='36.3605' height='32' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A"  />
        <p><strong>We will be launching a newly redesigned training site very soon!</strong> But don't worry - the current content will still be available in a GitHub repo.</p>

        <button onClick={closeAnnounce}>
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.72">
                    <path d="M5.56055 6L17.3995 18.7742" stroke="#DADBE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.56055 18.7742L17.3995 5.99998" stroke="#DADBE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
        </button>
      </div>

    </Wrapper>
  );
}

