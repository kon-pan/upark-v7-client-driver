import QrReader from 'react-qr-reader';

const Scanner = ({
  liftAddressId,
  liftAddressName,
}: {
  liftAddressId: (value: number) => void;
  liftAddressName: (value: string) => void;
}) => {
  const handleErrorWebCam = (error: any) => {
    console.log(error);
  };

  const handleScanWebCam = async (result: string | null) => {
    if (result) {
      const resultJSON: { id: number; name: string } = await JSON.parse(result);
      // console.log(resultJSON);

      liftAddressId(resultJSON.id);
      liftAddressName(resultJSON.name);
    }
  };
  return (
    <div className='flex flex-col'>
      <div className='w-full px-4 py-4 text-center text-sm font-semibold'>
        Σκαναρετε τον QR κωδικό που βρίσκεται στη πινακίδα κοντά στη θέση
        στάθμευσής σας
      </div>
      <QrReader
        delay={500}
        style={{ width: '100%' }}
        onError={handleErrorWebCam}
        onScan={handleScanWebCam}
        facingMode='environment'
      />
    </div>
  );
};

export default Scanner;
