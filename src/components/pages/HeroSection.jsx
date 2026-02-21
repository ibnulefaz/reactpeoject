

const HeroSection = () => {

    return (

        <div className='bg-green-500 text-white p-4 rounded-lg' style={{

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
            position: "relative",
            zIndex: 1,
            opacity: 0.5,
            filter: "brightness(0.7)"
        }}    >
            <h1 className='text-4xl font-bold'>Welcome to my wesite</h1>
            <p className='text-2xl'> Your Journey start here</p>
            <button className='bg-green-600 text-white px-4 py-2 rounded-lg'>Get Started</button>
        </div>
    )
}

export default HeroSection
