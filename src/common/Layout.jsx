import { StyledView } from '@common/StyledComponents';
import CustomHeader from './CustomHeader';

const Layout = ({ children, title, noBackBtn, navigationScreen }) => {
    return (
        <>
            <CustomHeader title={title} noBackBtn={noBackBtn} navigationScreen={navigationScreen} />
            <StyledView className="flex-1 p-4">
                {children}
            </StyledView>
        </>
    );
};

export default Layout;
