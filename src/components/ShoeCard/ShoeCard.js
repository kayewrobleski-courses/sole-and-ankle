import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default';

  const STYLES = {
    'on-sale': {
      text: 'Sale',
      color: COLORS.primary,
    },
    'new-release': {
      text: 'Just Released!',
      color: COLORS.secondary
    }
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {STYLES[variant] &&
            <Detail style={{'--color': `${STYLES[variant].color}`}}>
              {STYLES[variant].text}
            </Detail>
          }
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
            <Price style={{'--text-decoration': `${variant === 'on-sale' ? 'line-through' : 'none'}`}}>
              {formatPrice(price)}
            </Price>
            {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
          </PriceWrapper>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 260px;
  max-width: 340px;
`;

const Wrapper = styled.article`
  margin: 31px 16px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  max-width: 80%;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Price = styled.span`
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  position: absolute;
  top: 24px;
`;

const Detail = styled.div`
  position: absolute;
  top: 8px;
  right: -4px;
  border-radius: 2px;
  width: fit-content;
  padding: 6px 9px;
  background: var(--color);
  color: ${COLORS.white};
  font-size: 0.75rem;
  font-weight: ${WEIGHTS.bold};
`;

export default ShoeCard;
