import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// import pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import BookList from './pages/BookList/BookList';
import BookDetails from './pages/BookDetails/BookDetails';
import Checkout from './pages/Checkout/Checkout';
import ThankYou from './pages/ThankYou/ThankYou';
import CheckoutSingle from './pages/CheckoutSingle/CheckoutSingle';
import ThankYouSingle from './pages/ThankYouSingle/ThankYouSingle';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  
  const booksArray = [
    {
      id: 1,
      title: `Harry Potter and the Philosopher's Stone`,
      genre: 'Fantasy',
      author: 'J.K. Rowling',
      price: 25,
      description: `Harry Potter's life takes a dramatic turn when he learns he's a wizard and receives an invitation to attend Hogwarts School of Witchcraft and Wizardry. Amidst learning magic and making friends, Harry uncovers the truth about his parents' deaths and discovers the dark wizard Voldemort's return. With the help of his loyal friends, Hermione and Ron, Harry confronts challenges that test his bravery and resilience. This enchanting story of friendship, magic, and self-discovery has become a timeless classic.`,
      image: require('./assets/images/harrypotter.jpg'),
  },
  {
      id: 2,
      title: 'Pride and Prejudice',
      genre: 'Romance',
      author: 'Jane Austen',
      price: 15,
      description: `Set in 19th-century England, this romantic classic follows the sharp-witted Elizabeth Bennet as she navigates love, family, and societal expectations. Initially repelled by the aloof and proud Mr. Darcy, Elizabeth slowly comes to see his true character and integrity. The novel is a brilliant critique of class dynamics, gender roles, and the complexities of relationships. Jane Austen's wit and engaging characters have made this one of the most beloved novels in literary history.`,
      image: require('./assets/images/pride.jpg'),
  },
  {
      id: 3,
      title: 'The Shining',
      genre: 'Fiction',
      author: 'Stephen King',
      price: 30,
      description: 'Jack Torrance accepts a winter caretaker job at the isolated Overlook Hotel, bringing his wife Wendy and young son Danny. As snow cuts them off from the outside world, the hotel’s sinister forces awaken Jack’s darker tendencies. Meanwhile, Danny’s psychic abilities reveal horrifying secrets within the hotel. Stephen King masterfully weaves psychological tension with supernatural horror, creating a chilling tale of madness and family disintegration.',
      image: require('./assets/images/shining.jpg'),
  },
  {
      id: 4,
      title: 'Fantastic Beasts and Where to Find Them',
      genre: 'Fantasy',
      author: 'J.K. Rowling',
      price: 18,
      description: 'Newt Scamander, a magizoologist, arrives in 1920s New York with a suitcase full of magical creatures. When some of his creatures escape, Newt teams up with local witches and wizards to recover them while uncovering a dark force threatening the magical community. This whimsical and adventurous story expands the Harry Potter universe, offering a delightful exploration of magical beasts and the challenges of their conservation. It’s a rich blend of humor, fantasy, and action.',
      image: require('./assets/images/fantastic.jpg'),
  },
  {
      id: 5,
      title: 'Becoming',
      genre: 'Non-Fiction',
      author: 'Michelle Obama',
      price: 28,
      description: `In this deeply personal memoir, Michelle Obama recounts her journey from a working-class childhood in Chicago to becoming the First Lady of the United States. She shares intimate reflections on her marriage to Barack Obama, raising two daughters under public scrutiny, and her initiatives to inspire change. The book offers an empowering message of resilience, determination, and hope. Michelle’s candid storytelling makes this a compelling read for anyone seeking inspiration.`,
      image: require('./assets/images/becoming.jpg'),
  },
  {
      id: 6,
      title: 'The Murder on the Orient Express',
      genre: 'Mystery',
      author: 'Agatha Christie',
      price: 20,
      description: `Hercule Poirot's journey aboard the luxurious Orient Express takes a deadly turn when a wealthy passenger is found murdered. With the train stranded due to snow, Poirot interrogates an eclectic cast of passengers, each with secrets and motives. As clues unfold, Poirot unravels a shocking conspiracy in this brilliantly crafted mystery. Agatha Christie's ingenious plotting and rich characterizations make this a masterpiece of the whodunit genre.`,
      image: require('./assets/images/murder.jpg'),
  },
  {
      id: 7,
      title: 'A Court of Thorns and Roses',
      genre: 'Fantasy',
      author: 'Sarah J. Maas',
      price: 19,
      description: 'Feyre Archeron, a mortal huntress, kills a wolf in the woods and is taken captive by a powerful fae lord as retribution. Thrust into the magical land of Prythian, Feyre discovers a world of beauty and danger while uncovering the curse that plagues her captor’s people. As she navigates political intrigue and growing emotions, Feyre must confront choices that test her courage and loyalty. This lush fantasy is filled with romance, adventure, and high-stakes action.',
      image: require('./assets/images/court.jpg'),
  },
  {
      id: 8,
      title: 'It',
      genre: 'Fiction',
      author: 'Stephen King',
      price: 35,
      description: `In the small town of Derry, Maine, a group of children known as the Losers' Club confronts an ancient, shape-shifting evil that preys on fear. The entity often takes the form of Pennywise the Clown, haunting the town in cycles. As adults, the Losers' Club must reunite to face their darkest fears and defeat "It" once and for all. Stephen King's blend of horror, friendship, and nostalgia makes this a chilling yet deeply emotional story.`,
      image: require('./assets/images/it.jpg'),
  },
  {
      id: 9,
      title: 'And Then There Were None',
      genre: 'Mystery',
      author: 'Agatha Christie',
      price: 22,
      description: 'Ten strangers are invited to a secluded island under mysterious circumstances, only to discover they are being targeted by a vengeful killer. One by one, the guests are murdered in accordance with a sinister nursery rhyme, leaving them to deduce who among them is the culprit. Agatha Christie’s masterful storytelling and suspenseful pacing make this one of the greatest murder mysteries of all time. It’s a tense, atmospheric tale that keeps readers guessing.',
      image: require('./assets/images/andthen.jpg'),
  },
  {
      id: 10,
      title: 'Sapiens: A Brief History of Humankind',
      genre: 'Non-Fiction',
      author: 'Yuval Noah Harari',
      price: 20,
      description: 'Yuval Noah Harari explores the history of Homo sapiens, from the Cognitive Revolution to the modern era. The book examines how humans evolved from insignificant apes to the dominant species on Earth. Harari delves into topics like religion, capitalism, and technological advancements, providing fresh perspectives on our collective history. This thought-provoking work challenges readers to reflect on the past and future of humanity.',
      image: require('./assets/images/sapiens.jpg'),
  },
  {
      id: 11,
      title: 'The Notebook',
      genre: 'Romance',
      author: 'Nicholas Sparks',
      price: 14,
      description: `This poignant love story follows Noah Calhoun and Allie Hamilton, two young lovers separated by societal expectations but reunited later in life. Through Noah’s heartfelt retelling, their enduring bond transcends time, challenges, and memory. The novel is a testament to the power of love and its ability to endure through life's hardships. Nicholas Sparks weaves emotion and nostalgia into this beautifully romantic tale.`,
      image: require('./assets/images/notebook.jpg'),
  },
  {
      id: 12,
      title: 'The Great Gatsby',
      genre: 'Fiction',
      author: 'F. Scott Fitzgerald',
      price: 12,
      description: 'Set in the Jazz Age of the 1920s, this iconic novel follows Jay Gatsby’s obsessive pursuit of his lost love, Daisy Buchanan. Narrated by Nick Carraway, the story explores themes of ambition, love, and the corrupting influence of wealth. Gatsby’s lavish parties and tragic end reveal the hollowness of the American Dream. F. Scott Fitzgerald’s evocative prose paints a vivid picture of excess, longing, and despair.',
      image: require('./assets/images/great.jpg'),
    },
  ];

  const addToBasket = async (book) => {
    try {
      const response = await fetch('/api/basket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ bookId: book.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to add book to basket');
      }

      const data = await response.json();
      console.log('Book added to the basket:', data);
    } catch (error) {
      console.error('Error adding to basket:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/books" element={<ProtectedRoute><BookList books={booksArray} /></ProtectedRoute> } />
        <Route path="/books/:bookId" element={<ProtectedRoute><BookDetails books={booksArray} addToBasket={addToBasket} /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout books={booksArray} /></ProtectedRoute>} />
        <Route path="/thank-you" element={<ProtectedRoute><ThankYou /></ProtectedRoute>} />
        <Route path="/checkout-single" element={<ProtectedRoute><CheckoutSingle /></ProtectedRoute>} />
        <Route path="/thank-you-single" element={<ProtectedRoute><ThankYouSingle /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
