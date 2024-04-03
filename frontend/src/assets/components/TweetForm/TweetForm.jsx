import { useContext } from "react";
import { UserContext } from "../../contexts/userProvider.jsx";
import { UserTokenContext } from "../../contexts/userTokenProvider.jsx";
import { createTweetSchema } from "../../schemas/tweets/createTweetSchema.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



export const TweetForm = ({ setIsTouched, isTouched }) => {

  const {userState} = useContext(UserContext);
  const {token} = useContext(UserTokenContext);
  const userId = userState?.data?.user.id;

  const { register, handleSubmit, reset, formState } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(createTweetSchema)
  });

  const { errors, isValid } = formState;

  const handleTweetSubmit = async (form) => {
    const fetchData = async () => {
      try {
        const tweet = {
          userId: userId,
          text: form.text
        };


        const response = await fetch('http://localhost:4000/tweets', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `${token}`
          },
          body: JSON.stringify(tweet)
        });

        if (!response.ok){
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        console.log(data);
        reset();
        setIsTouched(!isTouched);



      } catch (error) {
        console.log(error.message)
      }
    }

    fetchData();
    
  }

  return (
    <form onSubmit={handleSubmit(handleTweetSubmit)} className='mt-10 border border-black flex flex-col gap-10 p-3'>NUEVO TWEET
        <input className='p-3 border border-black' type="text" placeholder='Tweet...' {...register('text')}/>
        <p className='h-4 text-sm text-red-500'>{errors.text && errors.text.message}</p>
        {/* <input className='p-3 border border-black' type="file" /> */}
        <button disabled={!isValid} className='disabled:bg-red-300 border border-black p-2'>Subir tweet</button>
      </form>
  )
}
