import React from "react";
import Link from "next/link";
import FriendItem from "../chat/friends/FriendItem";
import "@resources/styles/components/friendsList.scss";
import { cookies } from 'next/headers'

export default async function FriendslistNav() {
  const token = (cookies().get('authToken')?.value ?? '');
  const getFriends = async () => {
    const res = await fetch(process.env.SERVER_URL + "/api/friends", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token ?? "",
      },
    });
    return await res.json();
  };

  const res = await getFriends();
  const friends = res.friends;
  
  const user = res.user;

  return (
    <div className="app-layout-content friends-list">
      <button className="conversation-btn">
        Find or start an ongoing converstation
      </button>
      <Link className="friends-link" href={"/app/channels/@me"}>
        <svg
          width="28"
          height="29"
          viewBox="0 0 28 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.22 17.0436C25.0045 16.382 25.5669 15.4947 25.8312 14.5021C26.0954 13.5095 26.0486 12.4594 25.6971 11.4944C25.3456 10.5293 24.7065 9.69577 23.8663 9.10686C23.0261 8.51794 22.0254 8.20208 21 8.20208C19.9746 8.20208 18.9739 8.51794 18.1337 9.10686C17.2935 9.69577 16.6544 10.5293 16.3029 11.4944C15.9514 12.4594 15.9046 13.5095 16.1688 14.5021C16.4331 15.4947 16.9955 16.382 17.78 17.0436C17.5567 17.1587 17.3397 17.2858 17.13 17.4243C16.2359 15.5249 14.708 13.9977 12.81 13.1063C14.0755 12.2822 15.0412 11.0704 15.5631 9.65154C16.0851 8.23271 16.1353 6.68286 15.7063 5.2331C15.2773 3.78334 14.3921 2.51132 13.1827 1.60671C11.9732 0.702101 10.5043 0.213358 8.995 0.213358C7.48568 0.213358 6.01678 0.702101 4.80733 1.60671C3.59788 2.51132 2.71267 3.78334 2.28369 5.2331C1.85471 6.68286 1.90493 8.23271 2.42688 9.65154C2.94882 11.0704 3.91453 12.2822 5.18 13.1063C3.63297 13.8328 2.32433 14.9855 1.40704 16.4296C0.489755 17.8738 0.00172527 19.5497 0 21.2614V27.2725C0 27.5382 0.105357 27.7931 0.292893 27.9809C0.48043 28.1688 0.734784 28.2744 1 28.2744H27C27.2652 28.2744 27.5196 28.1688 27.7071 27.9809C27.8946 27.7931 28 27.5382 28 27.2725V23.2651C27.999 21.9807 27.646 20.7213 26.9794 19.6242C26.3128 18.527 25.3583 17.6344 24.22 17.0436ZM18 13.2465C18 12.6521 18.1759 12.071 18.5056 11.5767C18.8352 11.0825 19.3038 10.6972 19.8519 10.4698C20.4001 10.2423 21.0033 10.1828 21.5853 10.2987C22.1672 10.4147 22.7018 10.701 23.1213 11.1213C23.5409 11.5416 23.8266 12.0772 23.9424 12.6602C24.0581 13.2432 23.9987 13.8475 23.7716 14.3967C23.5446 14.9459 23.1601 15.4153 22.6667 15.7456C22.1734 16.0758 21.5933 16.2521 21 16.2521C20.2044 16.2521 19.4413 15.9355 18.8787 15.3718C18.3161 14.8082 18 14.0437 18 13.2465ZM4 7.23541C4 6.24467 4.29324 5.27618 4.84265 4.45241C5.39206 3.62864 6.17295 2.98659 7.08658 2.60745C8.00021 2.22831 9.00555 2.12911 9.97545 2.32239C10.9454 2.51567 11.8363 2.99276 12.5355 3.69332C13.2348 4.39388 13.711 5.28645 13.9039 6.25815C14.0969 7.22986 13.9978 8.23706 13.6194 9.15238C13.241 10.0677 12.6001 10.85 11.7779 11.4005C10.9556 11.9509 9.98891 12.2447 9 12.2447C7.67392 12.2447 6.40215 11.7169 5.46447 10.7775C4.52678 9.83809 4 8.56396 4 7.23541ZM2 26.2707V21.2614C2 19.4014 2.7375 17.6176 4.05025 16.3025C5.36301 14.9873 7.14348 14.2484 9 14.2484C10.8565 14.2484 12.637 14.9873 13.9497 16.3025C15.2625 17.6176 16 19.4014 16 21.2614V26.2707H2ZM26 26.2707H18V21.2614C18.002 20.6491 17.9416 20.0381 17.82 19.438C18.7053 18.6765 19.8332 18.2572 21 18.2558C22.3261 18.2558 23.5979 18.7836 24.5355 19.723C25.4732 20.6624 26 21.9366 26 23.2651V26.2707Z"
            fill="#DBDEE1"
            fillOpacity="0.8"
          />
        </svg>
        Friends
      </Link>

      <div className="friends-container">
        <p>Direct messages</p>

        <ul>
        {friends.map((friend:any) => (
            <FriendItem key={friend.id} user={friend} />
          ))}


          {/* <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} />
          <FriendItem user={user} /> */}
        </ul>
      </div>

      <div className="user-display">
        <p>
          <span>{user.username.split('')[0].toUpperCase()+user.username.split('')[1].toUpperCase()}</span>{user.username}#{user.userTag}
        </p>
        <button className="settings-btn">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.6725 10.3952H25.5V15.4045H22.6737C22.3725 16.5704 21.875 17.6561 21.2063 18.6154L23 20.4138L20.5 22.9184L18.7063 21.1201C17.7463 21.7901 16.665 22.2897 15.5 22.5903V25.423H10.5V22.5903C9.33625 22.2897 8.25375 21.7901 7.295 21.1201L5.5 22.9184L3 20.4138L4.795 18.6154C4.12625 17.6574 3.6275 16.5716 3.3275 15.4045H0.5V10.3952H3.3275C3.6275 9.22804 4.125 8.14353 4.795 7.18425L3 5.38592L5.5 2.88129L7.295 4.67962C8.2525 4.00837 9.335 3.50995 10.5 3.20939V0.376648H15.5V3.20814C16.665 3.50995 17.7463 4.00837 18.7063 4.67836L20.5 2.88003L23 5.38467L21.205 7.18425C21.8737 8.14353 22.3725 9.22929 22.6725 10.3952ZM13 17.9091C15.7614 17.9091 18 15.6663 18 12.8998C18 10.1333 15.7614 7.89056 13 7.89056C10.2386 7.89056 8 10.1333 8 12.8998C8 15.6663 10.2386 17.9091 13 17.9091Z"
              fill="#B9BCBF"
              fillOpacity="0.8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
