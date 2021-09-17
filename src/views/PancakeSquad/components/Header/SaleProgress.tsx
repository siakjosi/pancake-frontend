import React from 'react'
import { Box, Progress, Text } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { SaleStatusEnum, UserStatusEnum } from '../../types'

type PreEventProps = {
  t: ContextApi['t']
  saleStatus: SaleStatusEnum
  userStatus: UserStatusEnum
  totalTicketsDistributed: number
  maxSupply: number
  totalSupplyMinted: number
}

const SaleProgressTextMapping: Record<SaleStatusEnum, string> = {
  [SaleStatusEnum.Pending]: '',
  [SaleStatusEnum.Presale]: '%remaining% of %total% remaining',
  [SaleStatusEnum.Sale]: '%remaining% of %total% remaining',
  [SaleStatusEnum.DrawingRandomness]: 'Randomizing NFT allocation with Chainlink',
  [SaleStatusEnum.Premint]: '%remaining% of %total% minted',
  [SaleStatusEnum.Claim]: '%remaining% of %total% minted',
}

const SaleProgress: React.FC<PreEventProps> = ({
  t,
  saleStatus,
  totalTicketsDistributed,
  totalSupplyMinted,
  maxSupply,
}) => {
  const displaySaleProgress = saleStatus !== SaleStatusEnum.Pending
  const supplyRemaining = maxSupply - totalTicketsDistributed
  const supplyRemainingPercentage = Math.round((supplyRemaining / maxSupply) * 100)
  const isMintCompleted = totalSupplyMinted === maxSupply && saleStatus === SaleStatusEnum.Claim
  return displaySaleProgress ? (
    <Box mb="24px">
      {isMintCompleted && (
        <Text color="warning" mb="40px" bold>
          {t('Mint Complete')}
        </Text>
      )}
      <Text color="invertedContrast" mb="24px" bold>
        {isMintCompleted
          ? t('All 10,000 Pancake Squad NFTs have now been minted!')
          : t(SaleProgressTextMapping[saleStatus], {
              remaining: supplyRemaining.toString(),
              total: maxSupply.toString(),
            })}
      </Text>
      {!isMintCompleted && <Progress variant="round" primaryStep={100 - supplyRemainingPercentage} />}
    </Box>
  ) : null
}

export default SaleProgress
