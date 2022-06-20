import { PARTNERS } from '../../app/shared/PARTNERS';

export const selectAllPartners = () => PARTNERS;

export const selectFeaturedPartners = () => {
    return (
        PARTNERS.find(partner => partner.featured)
    );
};