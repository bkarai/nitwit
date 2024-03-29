import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

import { useGameAccessKey } from 'hooks';
import { Button, Box } from 'components';

export const IconWrapper = styled(Box)({
  svg: {
    borderRadius: '50%',
  },
});

function fireSuccessCopyLinkAlert() {
  return Swal.fire({
    title: 'Success',
    text: 'Your game link has been copied to the clipboard',
    icon: 'success',
    heightAuto: false,
  });
}

function fireFailCopyLinkAlert() {
  return Swal.fire({
    title: 'Oops!',
    text: 'Please copy the link manually.',
    icon: 'error',
    heightAuto: false,
  });
}

export function WaitingForPlayer() {
  const gameAccessKey = useGameAccessKey();
  const linkToJoinGame = `${window.location.origin}/game/${gameAccessKey}/join/`;
  const copyLinkAvailable = !!navigator.clipboard;

  const copyToClipboard = () => {
    if (copyLinkAvailable) {
      navigator.clipboard.writeText(linkToJoinGame).then(fireSuccessCopyLinkAlert).catch(fireFailCopyLinkAlert);
    }
  };

  return (
    <Box>
      <h1 className="display-2">
        Waiting for opponent to join
      </h1>
      <h2 className="mt-5">
        Copy the link below to invite a player to your game
      </h2>
      <Box className="input-group mb-5 mt-5" height='auto'>
        <output className="form-control" aria-label='Contains the link to the online game. Your opponent should use this link to join the game.'>
          {linkToJoinGame}
        </output>
        {copyLinkAvailable && <Button className="input-group-append" style={{ width: '25%' }} onClick={copyToClipboard}>Copy</Button> }
      </Box>
      <IconWrapper>
        <EmailShareButton className="me-2" openShareDialogOnClick url={linkToJoinGame} subject="Join a game of Nitwit!" body="Hello, you've been invited to a game of Nitwit. Copy and paste the following link in your browser address bar to join the game: ">
          <EmailIcon />
        </EmailShareButton>
        <FacebookShareButton className="me-2" url={linkToJoinGame}>
          <FacebookIcon />
        </FacebookShareButton>
        <FacebookMessengerShareButton className="me-2" url={linkToJoinGame} appId="1330815067487108">
          <FacebookMessengerIcon />
        </FacebookMessengerShareButton>
        <WhatsappShareButton className="me-2" url={linkToJoinGame}>
          <WhatsappIcon />
        </WhatsappShareButton>
      </IconWrapper>
    </Box>
  );
};
