import React from 'react'

const GoogleMaps = () => { 
    return (
        <div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21331.17920476709!2d-69.2008266765454!3d-12.593749204210257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x917b4f8b53320c17%3A0x5d44790304316ce1!2sPlaza%20De%20Armas%20Puerto%20Maldonado!5e0!3m2!1ses!2spe!4v1745512036954!5m2!1ses!2spe"
                    width="100%"
                    height="450"
                    style={{ border: "none" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
        </div>
    )
}

export default GoogleMaps

