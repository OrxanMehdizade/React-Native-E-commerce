import { StyledText, StyledTouchableOpacity } from '@common/StyledComponents';
import { useNavigation } from '@react-navigation/native';

const InfoCard = ({ cardItem }) => {
    const navigation = useNavigation();

    const [selectedSize, setSelectedSize] = useState(cardItem.itemOptions[0]?.size || "");
    const [selectedColor, setSelectedColor] = useState(cardItem.itemOptions[0]?.color || "");

    const sizeOptions = Array.from(
        new Set(cardItem.itemOptions.map((option) => option.size))
    );
    const colorOptions = Array.from(
        new Set(
            cardItem.itemOptions
                .filter((option) => option.size === selectedSize)
                .map((option) => option.color)
        )
    );

    const getQuantity = () => {
        const option = cardItem.itemOptions.find(
            (option) => option.size === selectedSize && option.color === selectedColor
        );
        return option ? option.quantity : 0;
    };

    return (
        <StyledTouchableOpacity 
        onPress={() => navigation.navigate('DetailsPage', { dataItems: cardItem })} 
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5"
    >
        <StyledImage 
            className="p-8 rounded-t-lg"
            source={{ uri: cardItem.gallery[0] }} // Burada gallery-dən şəkil alınır
            alt={cardItem.title} 
        />
        <StyledView className="px-5 pb-5">
            <StyledText className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {cardItem.title}
            </StyledText>
            <StyledView className="flex items-center justify-between mt-4">
                <StyledText className="text-3xl font-bold text-gray-900 dark:text-white">
                    {cardItem.price} {cardItem.currency}
                </StyledText>
                <StyledTouchableOpacity className="text-white bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <StyledText className="text-white">Add to cart</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    </StyledTouchableOpacity>
    );
};

export default InfoCard;