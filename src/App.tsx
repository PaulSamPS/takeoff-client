import React from 'react';
import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Main/Layout';
import { News } from './pages/News/News';
import { Auth } from './layout/Auth/Auth';
import { PrivateAuth } from './helpers/PrivateAuth';
import { FriendsList } from './pages/FriendsList/FriendsList';
import { ConversationsList } from './pages/ConversationsList/ConversationsList';
import { socketContext, SocketContext } from './helpers/socketContext';
import { Profile } from './pages/Profile/Profile';
import { ConversationsListChat } from './pages/ConversationsList/Chat/Chat';
import { ConversationsUnread } from './pages/ConversationsList/ConversationsUnread/ConversationsUnread';
import { Conversations } from './pages/ConversationsList/Conversations/Conversations';
import { FriendsListFind } from './pages/FriendsList/Find/Find';
import { Friends } from './pages/FriendsList/Friends/Friends';
import { FriendsRequests } from './pages/FriendsList/Requests/Requests';
import { AuthLogin } from './pages/Auth/Login/Login';
import { AuthRegistration } from './pages/Auth/Registration/Registration';
import { AuthRegistrationSuccess } from './pages/Auth/RegistrationSuccess/RegistrationSuccess';
import { Edit } from './pages/Edit/Edit';
import { EditBasic } from './pages/Edit/Basic/Basic';
import { EditContacts } from './pages/Edit/Contacts/Contacts';
import { UserFriends } from './pages/UserFriends/UserFriends';
import { Settings } from './pages/Settings/Settings';
import { SettingsGeneral } from './pages/Settings/SettingsGeneral/SettingsGeneral';
import { SettingsNotifications } from './pages/Settings/SettingsNotifications/SettingsNotifications';
import { AllNotifications } from './pages/AllNotifications/AllNotifications';
import { AllNotificationsItem } from './pages/AllNotifications/Item/Item';

export const App = () => {
  const { socket } = socketContext();

  return (
    <>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Auth />}>
              <Route index element={<AuthLogin />} />
              <Route path='/registration' element={<AuthRegistration />} />
              <Route path='/registration/success' element={<AuthRegistrationSuccess />} />
            </Route>
            <Route
              path='/main'
              element={
                <PrivateAuth>
                  <Layout />
                </PrivateAuth>
              }
            >
              <Route path='news' element={<News />} />
              <Route path='news/:id' element={<News />} />
              <Route path='profile/:id' element={<Profile />} />
              <Route path='edit' element={<Edit />}>
                <Route index element={<EditBasic />} />
                <Route path='contacts' element={<EditContacts />} />
              </Route>
              <Route path='conversations' element={<ConversationsList />}>
                <Route index element={<Conversations />} />
                <Route path='unread' element={<ConversationsUnread />} />
                <Route path=':id' element={<ConversationsListChat />} />
              </Route>
              <Route path='friends' element={<FriendsList />}>
                <Route index element={<Friends />} />
                <Route path='requests' element={<FriendsRequests />} />
                <Route path='find' element={<FriendsListFind />} />
              </Route>
              <Route path='user-friends' element={<UserFriends />}>
                <Route index element={<Friends />} />
                <Route path='followers' element={<Friends />} />
              </Route>
              <Route path='settings' element={<Settings />}>
                <Route index element={<SettingsGeneral />} />
                <Route path='notifications' element={<SettingsNotifications />} />
              </Route>
              <Route path='all-notifications' element={<AllNotifications />}>
                <Route index element={<AllNotificationsItem />} />
                <Route path='comments' element={<AllNotificationsItem />} />
              </Route>
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </>
  );
};
