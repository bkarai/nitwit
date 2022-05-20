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
import { ContentWrapper } from 'components';

export const IconWrapper = styled.div({
  svg: {
    borderRadius: '50%',
  },
});

export function WaitingForPlayer() {
  const gameAccessKey = useGameAccessKey();
  const linkToJoinGame = `${window.location.origin}/game/${gameAccessKey}/join/`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkToJoinGame);
    Swal.fire({
      title: 'Success',
      text: 'Your game link has been copied to the clipboard',
      icon: 'success',
    });
  };

  return (
    <ContentWrapper>
      <h1 className="display-2">
        Waiting for opponent to join...
      </h1>
      <h2 className="mt-4">
        Copy the link below to invite a player to your game
      </h2>
      <div className="input-group mb-3 mt-3">
        <output className="form-control">
          {linkToJoinGame}
        </output>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={copyToClipboard}>Copy</button>
        </div>
      </div>
      <IconWrapper>
        <EmailShareButton className="me-2" openShareDialogOnClick url={linkToJoinGame} subject="Join a game of Outwit!" body="Hello, you've been invited to a game of Outwit. Copy and paste the following link in your browser address bar to join the game: ">
          <EmailIcon />
        </EmailShareButton>
        <FacebookShareButton className="me-2" url={linkToJoinGame}>
          <FacebookIcon />
        </FacebookShareButton>
        <FacebookMessengerShareButton className="me-2" url={linkToJoinGame} appId="TODO">
          <FacebookMessengerIcon />
        </FacebookMessengerShareButton>
        <WhatsappShareButton className="me-2" url={linkToJoinGame}>
          <WhatsappIcon />
        </WhatsappShareButton>
      </IconWrapper>
    </ContentWrapper>
  );
};
