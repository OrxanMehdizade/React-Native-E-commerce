import { StyledView, StyledText } from '@common/StyledComponents';
import { useEffect, useState } from 'react';
import InfoCard from '@components/InfoCard';
import Layout from '@common/Layout';
import NoData from '@components/NoData';
import { FlatList } from 'react-native';


const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/products/');

      const newData = await response.json();

      setData(newData);
    }
    fetchData();
  }, []);


  return (
    <Layout title="Home" noBackBtn={true}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => <InfoCard cardItem={item} />}
        ListEmptyComponent={() => <NoData />}
      />
    </Layout>
  );
};

export default HomePage;
