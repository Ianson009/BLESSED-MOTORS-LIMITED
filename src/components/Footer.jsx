


const Footer = () =>{
    return(
    <div className="row text-white bg-warning p-3" >
        <div className=" col-md-4">
            <h4 className="text-center">About Us</h4>
            <p>We are the best Car dealers in the country</p>
            <p>For more details ypu can visit us or call us</p>
        </div>
        <div className="col-md-4">
            <h4 className="text-center">Contact Us</h4>
            <form action="">
                <input type="text" className="form-control" placeholder="Enter Your Email" /><br />
                <textarea name="" id="" cols="30" rows="6" className="form-control" placeholder="Leave a Comment"></textarea>
                <input type="button" value="Send Message" className="btn btn-outline-danger" />


                <footer className="text-white bg-primary text-center p-2">
                    <h5>Developed by Ianson Mutethia &copy;2026 All RIghts Reserved</h5>

                </footer>
            </form>

        </div>
        
        
    </div>
    
   ) 


}

export default Footer