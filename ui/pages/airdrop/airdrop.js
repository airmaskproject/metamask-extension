import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import CollectibleDetails from '../../components/app/collectible-details/collectible-details';
import { getCollectibles, getTokens } from '../../ducks/metamask/metamask';
import { DEFAULT_ROUTE } from '../../helpers/constants/routes';
import { isEqualCaseInsensitive } from '../../helpers/utils/util';

import NativeAirdrop from './components/native-airdrop';
import TokenAirdrop from './components/token-airdrop';

const Airdrop = () => {
  const nativeCurrency = useSelector((state) => state.metamask.nativeCurrency);
  const tokens = useSelector(getTokens);
  const collectibles = useSelector(getCollectibles);
  const { asset, id } = useParams();

  const token = tokens.find(({ address }) =>
    isEqualCaseInsensitive(address, asset),
  );

  const collectible = collectibles.find(
    ({ address, tokenId }) =>
      isEqualCaseInsensitive(address, asset) && id === tokenId,
  );

  useEffect(() => {
    const el = document.querySelector('.app');
    el.scroll(0, 0);
  }, []);

  let content;
  if (collectible) {
    content = <CollectibleDetails collectible={collectible} />;
  } else if (token) {
    content = <TokenAirdrop token={token} />;
  } else if (asset === nativeCurrency) {
    content = <NativeAirdrop nativeCurrency={nativeCurrency} />;
  } else {
    content = <Redirect to={{ pathname: DEFAULT_ROUTE }} />;
  }
  return <div className="main-container airdrop__container">{content}</div>;
};

export default Airdrop;
