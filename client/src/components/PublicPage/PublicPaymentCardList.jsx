import PaymentCard from "../Dashboard/PaymentCard"

const PublicPaymentCardList = ({ updatedData, username }) => {
    const isPublic = true;
    return (
        <>
            {/* CARD */}
            <div className="flex flex-wrap justify-center max-w-7xl">
                {updatedData &&
                    <>
                        {updatedData.slice().reverse().map((eachPayment) => (
                            <PaymentCard eachPayment={eachPayment} key={eachPayment._id} isPublic={isPublic} username={username} />
                        ))}
                    </>
                }
            </div>
        </>
    )
}
export default PublicPaymentCardList