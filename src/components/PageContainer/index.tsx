import Header from '../Header';

export default function PageContainer({children}) {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
    </>
  );
}
