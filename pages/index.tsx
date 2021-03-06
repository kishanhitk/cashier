import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import styles from "../styles/Home.module.css";
import { countCurrency, Currency } from "../util/countCurrency";
export default function Home() {
  const [billAmount, setbillAmount] = useState(0);
  const [cashGiven, setCashGiven] = useState(0);
  const [returnAmount, setReturnAmount] = useState(0);
  const [returnAmountVisible, setReturnAmountVisible] = useState(false);
  const [returnAmountText, setReturnAmountText] = useState("");
  const [cashGivenVisible, setCashGivenVisible] = useState(false);
  const [returnAmountCurrency, setReturnAmountCurrency] = useState<Currency[]>(
    []
  );
  const reset = () => {
    setbillAmount(0);
    setCashGiven(0);
    setReturnAmount(0);
    setReturnAmountVisible(false);
    setReturnAmountText("");
    setCashGivenVisible(false);
    setReturnAmountCurrency([]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setReturnAmount(cashGiven - billAmount);
    if (cashGiven - billAmount < 0) {
      setReturnAmountText(
        `Customer need to pay $${billAmount - cashGiven} more`
      );
    } else if (cashGiven - billAmount == 0) {
      setReturnAmountText(`All clear`);
    } else {
      setReturnAmountText("You need to return $" + (cashGiven - billAmount));
    }
    setReturnAmountVisible(true);
    setReturnAmountCurrency(countCurrency(cashGiven - billAmount));
    console.log(returnAmountCurrency);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Cashier!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading className={styles.title} size="large">
          Welcome to Cashier!
        </Heading>

        <Text className={styles.description}>
          Calculate cash return amount in seconds.
        </Text>
        <Box backgroundColor="blue.100" p="10" rounded="10">
          <form onSubmit={handleSubmit} className={styles.form}>
            <FormControl marginBottom={5}>
              <FormLabel>Bill Amount</FormLabel>
              <Input
                variant="filled"
                className={styles.input}
                type="number"
                value={billAmount}
                placeholder="Bill Amount"
                onChange={(e) => setbillAmount(parseInt(e.target.value))}
              ></Input>
            </FormControl>

            {!cashGivenVisible && (
              <Button
                className={styles.button}
                onClick={() => {
                  setCashGivenVisible(true);
                }}
              >
                Next
              </Button>
            )}
            {cashGivenVisible && (
              <FormControl mb="5">
                <FormLabel>Cash Given</FormLabel>
                <Input
                  className={styles.input}
                  type="number"
                  variant="filled"
                  value={cashGiven}
                  placeholder="Cash Given"
                  onChange={(e) => setCashGiven(parseInt(e.target.value))}
                ></Input>
              </FormControl>
            )}
            {cashGiven > 0 && (
              <Button
                className={styles.button}
                variant="solid"
                colorScheme="messenger"
                type="submit"
              >
                Calculate
              </Button>
            )}
          </form>
          {returnAmountVisible && (
            <>
              <VStack className={styles.returnAmount} mt="3">
                <Button
                  onClick={() => reset()}
                  colorScheme="messenger"
                  variant="ghost"
                >
                  Reset
                </Button>
                <Heading
                  textAlign="center"
                  className={styles.returnAmountTitle}
                  size="medium"
                >
                  Return Amount:
                </Heading>
                <Text className={styles.returnAmountText}>
                  {returnAmountText}
                </Text>
              </VStack>
              {returnAmount > 0 && (
                <>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Note Type</Th>
                        <Th>Count</Th>
                        <Th>Total</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {returnAmountCurrency.map((item, index) => (
                        <Tr key={index}>
                          <Td>{item.note}</Td>
                          <Td>{item.count}</Td>
                          <Td>{item.note * item.count}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>.</Th>
                        <Th>Total Count</Th>
                        <Th>Total Amount</Th>
                      </Tr>
                      <Tr>
                        <Td>.</Td>
                        <Td>
                          {returnAmountCurrency.reduce(
                            (a, c) => a + c.count,
                            0
                          )}
                        </Td>
                        <Td>
                          {returnAmountCurrency.reduce(
                            (a, c) => a + c.count * c.note,
                            0
                          )}
                        </Td>
                      </Tr>
                    </Tfoot>
                  </Table>
                </>
              )}
            </>
          )}
        </Box>
      </main>

      <footer className={styles.footer}>
        <Link href="https://kishans.in" target="_blank">
          Built by Kishan
        </Link>
      </footer>
    </div>
  );
}
