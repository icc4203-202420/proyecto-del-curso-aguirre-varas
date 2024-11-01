import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Card } from "react-native-elements";

import { getItem } from "../../util/Storage";
import { fetchUsers } from "../../services/users/users";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  age: number;
  email: string;
  jti: string;
  handle: string;
};

function Users({ searchQuery }: { searchQuery: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const filterUsers = (users: User[], searchQuery: string) => {
    return users.filter((user) => {
      console.log("User:", user);
      console.log(userId);
      console.log(user.id.toString() !== userId);
      return (
        user.id.toString() !== userId &&
        (user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.handle.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  };

  useEffect(() => {
    const getUserId = async () => {
      const userId = await getItem("userId");
      setUserId(userId);
    };
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
      } catch (error) {
        setErrorMessage("Error fetching users");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUserId();
    getUsers();
  }, []);

  const fileteredUsers = filterUsers(users, searchQuery);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <FlatList
          data={fileteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card>
              <TouchableOpacity
                onPress={() =>
                  setExpandedUserId(expandedUserId === item.id ? null : item.id)
                }
              >
                <Text>
                  {item.first_name} {item.last_name}
                </Text>
                {expandedUserId === item.id && (
                  <View>
                    <Text>Email: {item.email}</Text>
                    <Text>Handle: {item.handle}</Text>
                    <Text>Age: {item.age}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Card>
          )}
        />
      )}
    </View>
  );
}

export default Users;
