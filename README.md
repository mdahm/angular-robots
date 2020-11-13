# Grammar

    <Expression> ::= <ExpressionGroup> | <BinaryExpression> | <UnaryExpression> | <IntegerLiteral>
    <ExpressionGroup> ::= '(' <Expression> ')'
    <BinaryExpression> ::= <Expression> <BinaryOperator> <Expression>
    <UnaryExpression> ::= <UnaryOperator> <Expression>
    <BinaryOperator> ::= '+' | '-' | '/' | '*'
    <UnaryOperator> ::= '+' | '-'
    <IntegerLiteral> ::= <Digit> <IntegerLiteral> | <Digit>
    <Digit> ::= '0' | '1' |'2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
